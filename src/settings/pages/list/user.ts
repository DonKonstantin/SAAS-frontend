import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration,} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";
import CustomActiveCell from "../../../components/ListPageCustom/CustomActiveCell";
import {getCurrentState} from "../../../context/AuthorizationContext";

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
    addPageUrl: {(): PageUrl} = () => {
        const {domain, project, menuType} = getCurrentState()
        switch (true) {
            case menuType === `project`:
                return {
                    href: "/domain/[domainId]/project/[projectId]/users/add",
                    as: `/domain/${domain}/project/${project}/users/add`
                }
            case menuType === `domain`:
                return {
                    href: "/domain/[domainId]/users/add",
                    as: `/domain/${domain}/users/add`
                }
            default:
                return {
                    href: "/users/add",
                    as: `/users/add`
                }
        }
    };
    editPageUrl: EditPageLinkGenerator = pk => {
        const {domain, project, menuType} = getCurrentState()
        switch (true) {
            case menuType === `project`:
                return {
                    href: "/domain/[domainId]/project/[projectId]/users/edit/[entityId]",
                    as: `/domain/${domain}/project/${project}/users/edit/${pk}`
                }
            case menuType === `domain`:
                return {
                    href: "/domain/[domainId]/users/edit/[entityId]",
                    as: `/domain/${domain}/users/edit/${pk}`
                }
            default:
                return {
                    href: "/users/edit/[entityId]",
                    as: `/users/edit/${pk}`
                }
        }
    };
}