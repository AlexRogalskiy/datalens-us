const US_ERRORS = {
    FOLDER_DESTINATION_NOT_EXIST: 'FOLDER_DESTINATION_NOT_EXIST',
    NOT_EXIST_ENTRY: 'NOT_EXIST_ENTRY',
    CONNECTION_COPY_DENIED: 'CONNECTION_COPY_DENIED',
    FOLDER_COPY_DENIED: 'FOLDER_COPY_DENIED',
    PARENT_FOLDER_NOT_EXIST: 'PARENT_FOLDER_NOT_EXIST',
    MODE_NOT_ALLOWED: 'MODE_NOT_ALLOWED',
    CURRENT_TENANT_IS_NOT_MASTER: 'CURRENT_TENANT_IS_NOT_MASTER',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    ENTRIES_WITH_INSUFFICIENT_PERMISSIONS: 'ENTRIES_WITH_INSUFFICIENT_PERMISSIONS',
    NOT_VALID_MASTER_TOKEN: 'NOT_VALID_MASTER_TOKEN',
    DLS_ADD_ENTITY_ERROR: 'DLS_ADD_ENTITY_ERROR',
    DLS_CHECK_BULK_PERMISSION_ERROR: 'DLS_CHECK_BULK_PERMISSION_ERROR',
    DLS_CHECK_PERMISSION_ERROR: 'DLS_CHECK_PERMISSION_ERROR',
    NOT_EXIST_TEMPLATE_FOLDER: 'NOT_EXIST_TEMPLATE_FOLDER',
    NOT_EXIST_CONFIG: 'NOT_EXIST_CONFIG',
    TEMPLATE_NOT_EXISTS: 'TEMPLATE_NOT_EXISTS',
    NOT_EXIST_DELETED_ENTRY: 'NOT_EXIST_DELETED_ENTRY',
    NOT_MATCH_TOGETHER: 'NOT_MATCH_TOGETHER',
    ENTRY_ALREADY_EXISTS: 'ERR.US.ENTRY_ALREADY_EXISTS',
    COLLECTIONS_ALREADY_ENABLED: 'ERR.US.COLLECTIONS_ALREADY_ENABLED',
    EXIST_ENTRY_WITH_THIS_KEY: 'EXIST_ENTRY_WITH_THIS_KEY',
    ENTRY_IS_LOCKED: 'ERR.US.ENTRY_IS_LOCKED',
    ENTRY_LOCK_FORCE_CONFLICT: 'ERR.US.ENTRY_LOCK_FORCE_CONFLICT',
    NOT_EXIST_TENANT: 'NOT_EXIST_TENANT',
    TENANT_IS_BEING_DELETED: 'TENANT_IS_BEING_DELETED',
    NOT_EXIST_TEMPLATES_CONFIG: 'NOT_EXIST_TEMPLATES_CONFIG',
    DLS_GET_SUGGEST_FAILED: 'DLS_GET_SUGGEST_FAILED',
    DLS_MODIFY_PERMISSIONS_FAILED: 'DLS_MODIFY_PERMISSIONS_FAILED',
    DLS_MODIFY_PERMISSIONS_BAD_REQUEST: 'DLS_MODIFY_PERMISSIONS_BAD_REQUEST',
    DLS_GET_PERMISSIONS_FAILED: 'DLS_GET_PERMISSIONS_FAILED',
    DLS_ADD_ENTITY_FAILED: 'DLS_ADD_ENTITY_FAILED',
    DLS_CHECK_BULK_PERMISSION_FAILED: 'DLS_CHECK_BULK_PERMISSION_FAILED',
    DLS_CHECK_PERMISSION_FAILED: 'DLS_CHECK_PERMISSION_FAILED',
    DLS_FORBIDDEN: 'DLS_FORBIDDEN',
    DLS_NOT_EXIST_ENTRY: 'DLS_NOT_EXIST_ENTRY',
    SWITCH_PUBLICATION_INCORRECT_WORKBOOK_ID: 'SWITCH_PUBLICATION_INCORRECT_WORKBOOK_ID',
    DLS_METHOD_NOT_IMPLEMENTED: 'DLS_METHOD_NOT_IMPLEMENTED',
    NOT_EXIST_DRAFT: 'NOT_EXIST_DRAFT',
    DURATION_IS_LIMITED: 'DURATION_IS_LIMITED',
    LOCK_TOKEN_REQUIRED: 'LOCK_TOKEN_REQUIRED',
    NOT_EXIST_LOCKED_ENTRY: 'NOT_EXIST_LOCKED_ENTRY',
    NOT_EXIST_FOLDER: 'NOT_EXIST_FOLDER',
    SCOPE_NOT_ALLOWED: 'SCOPE_NOT_ALLOWED',
    NOT_EXIST_STATE_BY_HASH: 'NOT_EXIST_STATE_BY_HASH',
    TENANTS_PER_CLOUD_QUOTA_EXCEEDED: 'TENANTS_PER_CLOUD_QUOTA_EXCEEDED',
    NOT_FOUND_COMMENT: 'NOT_FOUND_COMMENT',
    DECODE_ID_FAILED: 'DECODE_ID_FAILED',
    USER_SETTINGS_NOT_EXISTS: 'USER_SETTINGS_NOT_EXISTS',
    NOT_EXIST_PRESET: 'NOT_EXIST_PRESET',
    NOT_EXIST_REVISION: 'NOT_EXIST_REVISION',
    WORKBOOK_TEMPLATE_NOT_EXISTS: 'WORKBOOK_TEMPLATE_NOT_EXISTS',
    ACCESS_SERVICE_CHECK_PERMISSION_ERROR: 'ACCESS_SERVICE_CHECK_PERMISSION_ERROR',
    ACCESS_SERVICE_PERMISSION_DENIED: 'ACCESS_SERVICE_PERMISSION_DENIED',
    ACCESS_SERVICE_UNAUTHENTICATED: 'ACCESS_SERVICE_UNAUTHENTICATED',
    ENTRY_WITHOUT_WORKBOOK_ID_COPY_DENIED: 'ENTRY_WITHOUT_WORKBOOK_ID_COPY_DENIED',
    INIT_TENANT_MIGRATING: 'INIT_TENANT_MIGRATING',
    MIGRATION_DENIED: 'MIGRATION_DENIED',
    MIGRATION_ORG_EXISTS: 'MIGRATION_ORG_EXISTS',
    COLLECTION_ALREADY_EXISTS: 'COLLECTION_ALREADY_EXISTS',
    WORKBOOK_ALREADY_EXISTS: 'WORKBOOK_ALREADY_EXISTS',
    COLLECTION_NOT_EXISTS: 'COLLECTION_NOT_EXISTS',
    COLLECTION_CIRCULAR_REFERENCE_ERROR: 'COLLECTION_CIRCULAR_REFERENCE_ERROR',
    WORKBOOK_NOT_EXISTS: 'WORKBOOK_NOT_EXISTS',
    WORKBOOK_ENTITY_ERROR: 'WORKBOOK_ENTITY_ERROR',
    WORKBOOK_COPY_FILE_CONNECTION_ERROR: 'WORKBOOK_COPY_FILE_CONNECTION_ERROR',
    WORKBOOK_OPERATION_FORBIDDEN: 'WORKBOOK_OPERATION_FORBIDDEN',
    SERVICE_ACCOUNT_ERROR: 'SERVICE_ACCOUNT_ERROR',
    ACCESS_SERVICE_ERROR: 'ACCESS_SERVICE_ERROR',
    ACCESS_BINDINGS_SERVICE_ERROR: 'ACCESS_BINDINGS_SERVICE_ERROR',
    NOT_ORG_INSTANCE_ERROR: 'NOT_ORG_INSTANCE_ERROR',
    INCORRECT_INSTALLATION_ERROR: 'INCORRECT_INSTALLATION_ERROR',
    COLOR_PALETTE_NOT_EXISTS: 'COLOR_PALETTE_NOT_EXISTS',
    TOO_MANY_COLOR_PALETTES: 'TOO_MANY_COLOR_PALETTES',
    DB_UNIQUE_VIOLATION: 'ERR.US.DB.UNIQUE_VIOLATION',
    SWITCH_PUBLICATION_INCORRECT_MAIN_ENTRY: 'ERR.US.SWITCH_PUBLICATION_INCORRECT_MAIN_ENTRY',
    CIRCULAR_REFERENCE_ERROR: 'CIRCULAR_REFERENCE_ERROR',
    MODIFY_USERS_FOLDER_DENIED: 'MODIFY_USERS_FOLDER_DENIED',
    EMBEDDING_SECRET_NOT_EXISTS: 'EMBEDDING_SECRET_NOT_EXISTS',
    EMBED_NOT_EXISTS: 'EMBED_NOT_EXISTS',
    INCORRECT_DEPS_IDS_FOR_EMBED: 'INCORRECT_DEPS_IDS_FOR_EMBED',
    INCORRECT_ENTRY_ID_FOR_EMBED: 'INCORRECT_ENTRY_ID_FOR_EMBED',
    EMBEDDING_INFO_IS_EMPTY: 'EMBEDDING_INFO_IS_EMPTY',
    READ_ONLY_MODE_ENABLED: 'READ_ONLY_MODE_ENABLED',
    ENTRY_IS_ALREADY_IN_WORKBOOK: 'ENTRY_IS_ALREADY_IN_WORKBOOK',
    ENTRY_IS_NOT_IN_WORKBOOK: 'ENTRY_IS_NOT_IN_WORKBOOK',
    UNKNOWN_OPERATION_TYPE: 'UNKNOWN_OPERATION_TYPE',
    IAM_OPERATION_NOT_EXISTS: 'IAM_OPERATION_NOT_EXISTS',
};

export const ERROR_BY_DLS_STATUS_CODE: {[key: number]: string} = {
    400: US_ERRORS.DLS_MODIFY_PERMISSIONS_BAD_REQUEST,
    403: US_ERRORS.DLS_FORBIDDEN,
    404: US_ERRORS.DLS_NOT_EXIST_ENTRY,
    405: US_ERRORS.DLS_METHOD_NOT_IMPLEMENTED,
};

export default US_ERRORS;