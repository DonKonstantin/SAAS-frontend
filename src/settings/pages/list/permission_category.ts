import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration,} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";

export class PermissionCategoryListingConfiguration implements ListPageConfiguration<"permission_category"> {
    filter: FilterFieldsConfiguration<"permission_category"> = {
        level: {
            field: "level",
            filterType: "EnumSelector",
            schema: "permission_category",
            title: "pages.permission_category.list.filters.level"
        },
        name: {
            field: "name",
            filterType: "Like",
            schema: "permission_category",
            title: "pages.permission_category.list.filters.name"
        },
    };
    listFields: ListFieldsConfiguration<"permission_category"> = {
        fields: {
            name: {
                field: "name",
                title: "pages.permission_category.list.fields.name",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },
            level: {
                field: "level",
                title: "pages.permission_category.list.fields.level",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Enum"
                }
            },
        },
        actions: ListPageEditDeleteButtons
    };
    schema: "permission_category" = "permission_category";
    elementsPerPage: number = 25;
    addPageUrl: PageUrl = {href: "/permission-category/add"};
    editPageUrl: EditPageLinkGenerator = pk => ({
        href: "/permission-category/edit/[entityId]",
        as: `/permission-category/edit/${pk}`
    });
}