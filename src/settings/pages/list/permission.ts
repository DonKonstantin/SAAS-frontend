import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration, RelationConfig,} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";

export class PermissionListingConfiguration implements ListPageConfiguration<"permission"> {
    filter: FilterFieldsConfiguration<"permission"> = {
        code: {
            field: "name",
            filterType: "Like",
            schema: "permission",
            title: "pages.permission.list.filters.code"
        },
        name: {
            field: "name",
            filterType: "Like",
            schema: "permission",
            title: "pages.permission.list.filters.name"
        },
        category_id: {
            relationConfiguration: {
                schema: "permission_category",
                visibleFields: ["name"]
            },
            field: "category_id",
            filterType: "RelationAutocompleteSelector",
            schema: "permission",
            title: "pages.permission.list.filters.category_id"
        },
    };
    listFields: ListFieldsConfiguration<"permission"> = {
        fields: {
            code: {
                field: "code",
                title: "pages.permission.list.fields.code",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },
            name: {
                field: "name",
                title: "pages.permission.list.fields.name",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },
            category_id: {
                field: "category_id",
                title: "pages.permission.list.fields.category_id",
                isEnabled: true,
                fieldType: {
                    config: <RelationConfig<"permission_category">>{
                        relatedFields: ["name"]
                    },
                    type: "Relation"
                }
            },
        },
        actions: ListPageEditDeleteButtons,
    };
    schema: "permission" = "permission";
    elementsPerPage: number = 25;
    editPageUrl: EditPageLinkGenerator = pk => ({
        href: "/permission/edit/[entityId]",
        as: `/permission/edit/${pk}`
    });
    addPageUrl: PageUrl = {href: "/permission/add"};
}