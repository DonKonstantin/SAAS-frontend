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
    ListFieldsConfiguration, RelationConfig,
} from "../../../services/listDataLoader/listLoader/types";
import {MultipleRelationCellWithLinkComponent} from "../../../components/ListPage/List/ListBody/ListCells/MultipleRelationWithLink";

export class UserConfiguration implements ListPageConfiguration<"user"> {
    filter: FilterFieldsConfiguration<"user"> = {
        email: new class implements BaseFilterFieldConfiguration<"user", "email", "Like"> {
            field: "email" = "email";
            filterType: "Like" = "Like";
            schema: "user" = "user";
            title: string = "E-mail";
        },
        first_name: new class implements BaseFilterFieldConfiguration<"user", "first_name", "Like"> {
            field: "first_name" = "first_name";
            filterType: "Like" = "Like";
            schema: "user" = "user";
            title: string = "Имя пользователя";
        },
        last_name: new class implements BaseFilterFieldConfiguration<"user", "last_name", "Like"> {
            field: "last_name" = "last_name";
            filterType: "Like" = "Like";
            schema: "user" = "user";
            title: string = "Фамилия пользователя";
        },
        roles_id: new class implements RelationFilterFieldConfiguration<"user", "roles_id", "RelationVariantsSelector"> {
            relationConfiguration: RelationConfiguration<"role"> = {
                schema: "role",
                visibleFields: ["name"]
            };
            field: "roles_id" = "roles_id";
            filterType: "RelationVariantsSelector" = "RelationVariantsSelector";
            schema: "user" = "user";
            title: string = "Роли пользователя";
        }
    };
    listFields: ListFieldsConfiguration<"user"> = {
        fields: {
            email: new class implements ListFieldConfiguration<"user", "email"> {
                field: "email" = "email";
                title: string = "E-mail пользователя";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            first_name: new class implements ListFieldConfiguration<"user", "first_name"> {
                field: "first_name" = "first_name";
                title: string = "Имя";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            last_name: new class implements ListFieldConfiguration<"user", "last_name"> {
                field: "last_name" = "last_name";
                title: string = "Фамилия";
                isEnabled: boolean = true;
                fieldType: FieldType<"Simple"> = {
                    config: undefined,
                    type: "Simple"
                }
            },
            roles_id: new class implements ListFieldConfiguration<"user", "roles_id"> {
                field: "roles_id" = "roles_id";
                title: string = "Роли пользователя";
                isEnabled: boolean = true;
                fieldType: FieldType<"MultipleRelation"> = {
                    config: <RelationConfig<"role">>{
                        relatedFields: ["name"]
                    },
                    customComponent: MultipleRelationCellWithLinkComponent(
                        id => ({as: `/role/edit/${id}`, href: `/role/edit/[entityId]`}),
                        "CHANGE_ROLES"
                    ),
                    type: "MultipleRelation"
                }
            },
        },
    };
    schema: "user" = "user";
    elementsPerPage: number = 30;
    readPermission: string = "READ_USERS";
    editPermission: string = "CHANGE_USERS";
    title: string = "Управление пользователями";
    header: string = "Управление пользователями";
    editPageUrl: EditPageLinkGenerator = primaryKey => ({as: `/user/edit/${primaryKey}`, href: `/user/edit/[entityId]`});
    addPageUrl: PageUrl = {href: `/user/add`};
}