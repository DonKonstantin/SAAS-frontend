import {SystemLogsFilterFieldConfiguration} from "./SystemLogsFilter/types";
import {LogsActionType, LogsFilterParams} from "../../services/systemLogsService/interface";

export const SystemLogsFilterConfiguration:
    {
        [K in keyof LogsFilterParams]?: SystemLogsFilterFieldConfiguration<LogsFilterParams[K] extends [] ? true : false>
    }
    = {
    userName: {
        fieldCode: "userName",
        fieldType: "EqualString",
        multiple: false,
        i18nextPath: "pages.SystemLogs.filter.field.userName"
    },
    eventType: {
        fieldCode: "eventType",
        fieldType:"MultiVariantEnumSelector",
        i18nextPath: "pages.SystemLogs.filter.field.eventType",
        variants: {
            updated: LogsActionType.updated,
            deleted: LogsActionType.deleted,
            created: LogsActionType.created
        }
    },
    entityType: {
        fieldCode: "entityType",
        fieldType:"VariantEnumSelector",
        i18nextPath: "pages.SystemLogs.filter.field.entityTypeName",
        variants: {
            NotificationConfig: "NotificationConfig",
            NotificationsTemplate: "NotificationsTemplate",
            Files: "Files",
            RealmStructureElement: "RealmStructureElement",
            ChangeUserPassword: "ChangeUserPassword",
            PermissionCategory: "PermissionCategory",
            Permission: "Permission",
            Role: "Role",
            User: "User",
        }
    },
    date: {
        fieldCode: "date",
        fieldType: "EqualDate",
        multiple: false,
        i18nextPath: "pages.SystemLogs.filter.field.date"
    },
}
