import {EditPageLinkGenerator, ListPageConfiguration, PageUrl} from "../system/list";
import {FilterFieldsConfiguration,} from "../../../services/listDataLoader/filterLoader/types";
import {ListFieldsConfiguration, RelationConfig,} from "../../../services/listDataLoader/listLoader/types";
import ListPageEditDeleteButtons from "../../../components/ListPageEditDeleteButtons";

export class NotificationConfigListingConfiguration implements ListPageConfiguration<"notification_config"> {
    filter: FilterFieldsConfiguration<"notification_config"> = {
       /* id: {
            field: "id",
            filterType: "Like",
            schema: "notification_config",
            title: "pages.notification_config.list.filters.name"
        },*/
        is_active: {
            field: "is_active",
            filterType: "Switch",
            schema: "notification_config",
            title: "pages.notification_config.list.filters.is_active"
        },
        template_id: {
            relationConfiguration: {
                schema: "notifications_template",
                visibleFields: ["name"]
            },
            field: "template_id",
            filterType: "RelationAutocompleteSelector",
            schema: "notification_config",
            title: "pages.notification_config.list.filters.template_id"
        },
        entity: {
            field: "entity",
            filterType: "EnumSelector",
            schema: "notification_config",
            title: "pages.notification_config.list.filters.entity"
        },
        event_type: {
            field: "event_type",
            filterType: "EnumSelector",
            schema: "notification_config",
            title: "pages.notification_config.list.filters.event_type"
        },
        channel: {
            field: "channel",
            filterType: "EnumSelector",
            schema: "notification_config",
            title: "pages.notification_config.list.filters.channel"
        },
    };
    listFields: ListFieldsConfiguration<"notification_config"> = {
        fields: {
            id: {
                field: "id",
                title: "pages.notification_config.list.fields.id",
                isEnabled: true,
                align: "left",
                width: 80,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },
            is_active: {
                field: "is_active",
                title: "pages.notification_config.list.fields.is_active",
                isEnabled: true,
                align: "left",
                width: 100,
                fieldType: {
                    config: undefined,
                    type: "Simple"
                }
            },
            template_id: {
                field: "template_id",
                title: "pages.notification_config.list.fields.template_id",
                isEnabled: true,
                align: "left",
                fieldType: {
                    config: <RelationConfig<"notifications_template">>{
                        relatedFields: ["name"]
                    },
                    type: "Relation"
                }
            },
            entity: {
                field: "entity",
                title: "pages.notification_config.list.fields.entity",
                isEnabled: true,
                align: "left",
                fieldType: {
                    config: undefined,
                    type: "Enum"
                }
            },
            event_type: {
                field: "event_type",
                title: "pages.notification_config.list.fields.event_type",
                isEnabled: true,
                align: "left",
                width: 150,
                fieldType: {
                    config: undefined,
                    type: "Enum"
                }
            },
            channel: {
                field: "channel",
                title: "pages.notification_config.list.fields.channel",
                isEnabled: true,
                align: "left",
                width: 150,
                fieldType: {
                    config: undefined,
                    type: "Enum"
                }
            },
        },
        actions: ListPageEditDeleteButtons
    };
    schema: "notification_config" = "notification_config";
    elementsPerPage: number = 25;
    addPageUrl: PageUrl = {href: "/notification-rules/add"};
    editPageUrl: EditPageLinkGenerator = pk => ({
        href: "/notification-rules/edit/[entityId]",
        as: `/notification-rules/edit/${pk}`
    });
}
