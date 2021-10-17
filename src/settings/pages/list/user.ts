import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration,} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";
import CustomActiveCell from "../../../components/ListPageCustom/CustomActiveCell";

export class UserListingConfiguration implements ListPageConfiguration<"user"> {
    filter: FilterFieldsConfiguration<"user"> = {
        email: {
            field: "email",
            filterType: "Like",
            schema: "user",
            title: "pages.users.list.filters.email"
        },
        first_name: {
            field: "first_name",
            filterType: "Like",
            schema: "user",
            title: "pages.users.list.filters.first_name"
        },
        last_name: {
            field: "last_name",
            filterType: "Like",
            schema: "user",
            title: "pages.users.list.filters.last_name",
        },
        active: {
            field: "active",
            filterType: "Switch",
            schema: "user",
            title: "pages.users.list.filters.active",
        },
        roles_id: {
            relationConfiguration: {
                schema: "role",
                visibleFields: ["name"]
            },
            field: "roles_id",
            filterType: "RelationVariantsSelector",
            schema: "user",
            title: "pages.users.list.filters.roles_id",
        }
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
    addPageUrl: PageUrl = {href: "/users/add"};
    editPageUrl: EditPageLinkGenerator = primaryKey => ({
        as: `/users/edit/${primaryKey}`,
        href: `/users/edit/[entityId]`
    });
}