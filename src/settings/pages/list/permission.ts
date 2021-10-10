import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration
} from "../../../services/listDataLoader/filterLoader/types";
import {
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration,
} from "../../../services/listDataLoader/listLoader/types";

export class PermissionConfiguration implements ListPageConfiguration<"permission"> {
    filter: FilterFieldsConfiguration<"permission"> = {
        code: new class implements BaseFilterFieldConfiguration<"permission", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "permission" = "permission";
            title: string = "Символьный код";
        },
        name: new class implements BaseFilterFieldConfiguration<"permission", "name", "Like"> {
            field: "name" = "name";
            filterType: "Like" = "Like";
            schema: "permission" = "permission";
            title: string = "Название (описание) разрешения";
        }
    };
    listFields: ListFieldsConfiguration<"permission"> = {
        fields: {
            code: new class implements ListFieldConfiguration<"permission", "code"> {
                field: "code" = "code";
                title: string = "Символьный код";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            name: new class implements ListFieldConfiguration<"permission", "name"> {
                field: "name" = "name";
                title: string = "Название (описание) разрешения";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
        },
    };
    schema: "permission" = "permission";
    elementsPerPage: number = 30;
    readPermission: string = "READ_PERMISSIONS";
    editPermission: string = "CHANGE_PERMISSIONS";
    title: string = "Управление правами пользователей";
    header: string = "Управление правами пользователей";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/permission/edit/${primaryKey}`, href: `/permission/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/permission/add`};
}