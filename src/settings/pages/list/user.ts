import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration,} from "../../../services/listDataLoader/listLoader/types";
import CustomActiveCell from "../../../components/CustomActiveCell";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";

export class UserConfiguration implements ListPageConfiguration<"user"> {
    filter: FilterFieldsConfiguration<"user"> = {
        email: {
            field: "email",
            filterType: "Like",
            schema: "user",
            title: "E-mail"
        },
        first_name: {
            field: "first_name",
            filterType: "Like",
            schema: "user",
            title: "Имя пользователя"
        },
        last_name: {
            field: "last_name",
            filterType: "Like",
            schema: "user",
            title: "Фамилия пользователя",
        },
        // roles_id: new class implements RelationFilterFieldConfiguration<"user", "roles_id", "RelationVariantsSelector"> {
        //     relationConfiguration: RelationConfiguration<"role"> = {
        //         schema: "role",
        //         visibleFields: ["name"]
        //     };
        //     field: "roles_id" = "roles_id";
        //     filterType: "RelationVariantsSelector" = "RelationVariantsSelector";
        //     schema: "user" = "user";
        //     title: string = "Роли пользователя";
        // }
    };
    listFields: ListFieldsConfiguration<"user"> = {
        fields: {
            email: {
                field: "email",
                title: "pages.users.list.fields.email",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },
            first_name: {
                field: "first_name",
                title: "pages.users.list.fields.first_name",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },
            last_name: {
                field: "last_name",
                title: "pages.users.list.fields.last_name",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },
            active: {
                field: "active",
                align: "left",
                width: 126,
                title: "pages.users.list.fields.active",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple",
                    customComponent: CustomActiveCell
                }
            },
        },
        actions: ListPageEditDeleteButtons
    };
    schema: "user" = "user";
    elementsPerPage: number = 25;
    addPageUrl: PageUrl = {href: "/"};
    editPageUrl: EditPageLinkGenerator = () => ({href: "/"});
}