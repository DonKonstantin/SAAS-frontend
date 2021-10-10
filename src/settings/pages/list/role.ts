import {
    EditPageLinkGenerator,
    ListPageConfiguration, PageUrl
} from "../system/list";
import {
    BaseFilterFieldConfiguration,
    FilterFieldsConfiguration,
    RelationConfiguration,
    RelationFilterFieldConfiguration,
} from "../../../services/listDataLoader/filterLoader/types";
import {
    FieldType,
    ListFieldConfiguration,
    ListFieldsConfiguration,
} from "../../../services/listDataLoader/listLoader/types";

export class RoleConfiguration implements ListPageConfiguration<"role"> {
    filter: FilterFieldsConfiguration<"role"> = {
        code: new class implements BaseFilterFieldConfiguration<"role", "code", "Like"> {
            field: "code" = "code";
            filterType: "Like" = "Like";
            schema: "role" = "role";
            title: string = "Символьный код";
        },
        name: new class implements BaseFilterFieldConfiguration<"role", "name", "Like"> {
            field: "name" = "name";
            filterType: "Like" = "Like";
            schema: "role" = "role";
            title: string = "Название роли";
        },
        permissions_id: new class implements RelationFilterFieldConfiguration<"role", "permissions_id", "RelationVariantsSelector"> {
            relationConfiguration: RelationConfiguration<"permission"> = {
                schema: "permission",
                visibleFields: ["name"]
            };
            field: "permissions_id" = "permissions_id";
            filterType: "RelationVariantsSelector" = "RelationVariantsSelector";
            schema: "role" = "role";
            title: string = "Разрешения роли";
        }
    };
    listFields: ListFieldsConfiguration<"role"> = {
        fields: {
            code: new class implements ListFieldConfiguration<"role", "code"> {
                field: "code" = "code";
                title: string = "Символьный код";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            name: new class implements ListFieldConfiguration<"role", "name"> {
                field: "name" = "name";
                title: string = "Название роли";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            }
        },
    };
    schema: "role" = "role";
    elementsPerPage: number = 30;
    readPermission: string = "READ_ROLES";
    editPermission: string = "CHANGE_ROLES";
    title: string = "Управление ролями пользователей";
    header: string = "Управление ролями пользователей";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/role/edit/${primaryKey}`, href: `/role/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/role/add`};
}