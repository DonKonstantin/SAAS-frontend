import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration,} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";

export class NotificationsTemplateListingConfiguration implements ListPageConfiguration<"notifications_template"> {
    filter: FilterFieldsConfiguration<"notifications_template"> = {
        name: {
            field: "name",
            filterType: "Like",
            schema: "notifications_template",
            title: "pages.notifications_template.list.filters.name"
        },
    };
    listFields: ListFieldsConfiguration<"notifications_template"> = {
        fields: {
            name: {
                field: "name",
                title: "pages.notifications_template.list.fields.name",
                isEnabled: true,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },

        },
        actions: ListPageEditDeleteButtons
    };
    schema: "notifications_template" = "notifications_template";
    elementsPerPage: number = 25;
    addPageUrl: PageUrl = {href: "/notifications-template/add"};
    editPageUrl: EditPageLinkGenerator = pk => ({
        href: "/notifications-template/edit/[entityId]",
        as: `/notifications-template/edit/${pk}`
    });
}
