import {TransactionOrKnex, transaction} from 'objection';
import {AppError} from '@gravity-ui/nodekit';
import {getParentIds} from '../../new/collection/utils/get-parents';
import {getId} from '../../../db';
import {Entry} from '../../../db/models/new/entry';
import {JoinedEntryRevision} from '../../../db/presentations/joined-entry-revision';
import {WorkbookModel} from '../../../db/models/new/workbook';
import Link from '../../../db/models/links';
import {CTX} from '../../../types/models';
import {US_ERRORS, BiTrackingLogs} from '../../../const';
import Utils, {logInfo, makeUserId} from '../../../utils';
import {WorkbookPermission} from '../../../entities/workbook';
import {makeSchemaValidator} from '../../../components/validation-schema-compiler';
import {registry} from '../../../registry';

interface Params {
    entryId: Entry['entryId'];
    destinationWorkbookId: WorkbookModel['workbookId'];
    tenantIdOverride?: Entry['tenantId'];
    skipWorkbookPermissionsCheck?: boolean;
    trxOverride?: TransactionOrKnex;
}

export const validateParams = makeSchemaValidator({
    type: 'object',
    required: ['entryId', 'destinationWorkbookId'],
    properties: {
        entryId: {
            type: 'string',
        },
        destinationWorkbookId: {
            type: 'string',
        },
        tenantIdOverride: {
            type: 'string',
        },
        skipWorkbookPermissionsCheck: {
            type: 'boolean',
        },
    },
});

export const copyToWorkbook = async (ctx: CTX, params: Params) => {
    const {
        entryId,
        destinationWorkbookId,
        tenantIdOverride,
        skipWorkbookPermissionsCheck = false,
        trxOverride,
    } = params;

    logInfo(ctx, 'COPY_ENTRY_TO_WORKBOOK_CALL', {
        entryId: Utils.encodeId(entryId),
        destinationWorkbookId,
        tenantIdOverride,
    });

    validateParams(params);

    const {tenantId, user} = ctx.get('info');
    const createdBy = makeUserId(user.userId);

    const {Workbook} = registry.common.classes.get();

    const targetTenantId = tenantIdOverride ?? tenantId;

    const originJoinedEntryRevision = await JoinedEntryRevision.findOne({
        where: {
            [`${Entry.tableName}.entryId`]: entryId,
            [`${Entry.tableName}.isDeleted`]: false,
        },
        joinRevisionArgs: {
            isPublishFallback: true,
        },
        trx: Entry.replica,
    });

    if (originJoinedEntryRevision === undefined) {
        throw new AppError('Entry not exists', {
            code: US_ERRORS.NOT_EXIST_ENTRY,
        });
    }

    if (tenantIdOverride === undefined && originJoinedEntryRevision.tenantId !== tenantId) {
        throw new AppError('Entry not exists', {
            code: US_ERRORS.NOT_EXIST_ENTRY,
        });
    }

    if (originJoinedEntryRevision.workbookId === null) {
        throw new AppError("Entry without workbookId, can't be copied to workbook", {
            code: US_ERRORS.ENTRY_WITHOUT_WORKBOOK_ID_COPY_DENIED,
        });
    }

    if (originJoinedEntryRevision.scope === 'folder') {
        throw new AppError('Folders cannot be copied', {
            code: US_ERRORS.FOLDER_COPY_DENIED,
        });
    }

    if (!skipWorkbookPermissionsCheck) {
        const workbookTargetTrx = trxOverride ?? WorkbookModel.replica;

        const [originWorkbookModel, destinationWorkbookModel]: Optional<WorkbookModel>[] =
            await Promise.all([
                WorkbookModel.query(workbookTargetTrx)
                    .findById(originJoinedEntryRevision.workbookId)
                    .timeout(WorkbookModel.DEFAULT_QUERY_TIMEOUT),
                WorkbookModel.query(workbookTargetTrx)
                    .findById(destinationWorkbookId)
                    .timeout(WorkbookModel.DEFAULT_QUERY_TIMEOUT),
            ]);

        if (originWorkbookModel === undefined || destinationWorkbookModel === undefined) {
            throw new AppError('Workbook not exists', {
                code: US_ERRORS.WORKBOOK_NOT_EXISTS,
            });
        }

        if (tenantIdOverride === undefined && originWorkbookModel.tenantId !== tenantId) {
            throw new AppError('Workbook not exists', {
                code: US_ERRORS.WORKBOOK_NOT_EXISTS,
            });
        }

        if (tenantIdOverride === undefined) {
            const originWorkbook = new Workbook({
                ctx,
                model: originWorkbookModel,
            });

            let originWorkbookParentIds: string[] = [];

            if (originWorkbook.model.collectionId !== null) {
                originWorkbookParentIds = await getParentIds({
                    ctx,
                    collectionId: originWorkbook.model.collectionId,
                });
            }

            await originWorkbook.checkPermission({
                parentIds: originWorkbookParentIds,
                permission: WorkbookPermission.Copy,
            });
        }

        const destinationWorkbook = new Workbook({
            ctx,
            model: destinationWorkbookModel,
        });

        let destinationWorkbookParentIds: string[] = [];

        if (destinationWorkbook.model.collectionId !== null) {
            destinationWorkbookParentIds = await getParentIds({
                ctx,
                collectionId: destinationWorkbook.model.collectionId,
            });
        }

        await destinationWorkbook.checkPermission({
            parentIds: destinationWorkbookParentIds,
            permission: WorkbookPermission.Update,
        });
    }

    const entryTargetTrx = trxOverride ?? Entry.primary;

    const newJoinedEntryRevision = await transaction(entryTargetTrx, async (transactionTrx) => {
        const [newEntryId, newRevId] = await Promise.all([getId(), getId()]);

        const displayKey = `${newEntryId}/${Utils.getNameByKey({
            key: originJoinedEntryRevision.displayKey,
        })}`;
        const key = displayKey.toLowerCase();

        const links = originJoinedEntryRevision.links as Nullable<Record<string, string>>;
        if (links) {
            await Link.sync({entryId: newEntryId, links, ctx, trxOverride: transactionTrx});
        }

        await Entry.query(transactionTrx)
            .insertGraph({
                scope: originJoinedEntryRevision.scope,
                type: originJoinedEntryRevision.type,
                key,
                innerMeta: null,
                createdBy: createdBy,
                updatedBy: createdBy,
                deletedAt: null,
                hidden: originJoinedEntryRevision.hidden,
                displayKey,
                entryId: newEntryId,
                savedId: newRevId,
                publishedId: originJoinedEntryRevision.publishedId ? newRevId : null,
                tenantId: targetTenantId,
                unversionedData: originJoinedEntryRevision.unversionedData,
                workbookId: destinationWorkbookId,
                revisions: [
                    {
                        data: originJoinedEntryRevision.data,
                        meta: originJoinedEntryRevision.meta,
                        createdBy: createdBy,
                        updatedBy: createdBy,
                        revId: newRevId,
                        entryId: newEntryId,
                        links,
                    },
                ],
            })
            .timeout(Entry.DEFAULT_QUERY_TIMEOUT);

        const copiedJoinedEntryRevision = await JoinedEntryRevision.findOne({
            where: {
                [`${Entry.tableName}.entryId`]: newEntryId,
                [`${Entry.tableName}.tenantId`]: targetTenantId,
                [`${Entry.tableName}.isDeleted`]: false,
            },
            joinRevisionArgs: {
                isPublishFallback: true,
            },
            trx: transactionTrx,
        });

        return copiedJoinedEntryRevision;
    });

    logInfo(ctx, BiTrackingLogs.CopyEntry, {
        entryId: Utils.encodeId(entryId),
    });

    return newJoinedEntryRevision;
};
