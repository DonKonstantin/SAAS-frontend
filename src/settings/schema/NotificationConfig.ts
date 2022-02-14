import {RelationConfiguration, Schema} from "./index";

// Параметры схемы настройки отправки оповещений
const notification_config: Schema = {
    fields: {
        id: {
            type: "ID!",
            isPrimaryKey: true,
            isArray: false
        },
        is_active: {
            type: "Boolean!",
            isPrimaryKey: false,
            isArray: false
        },
        template_id: {
            type: "Int!",
            isArray: false,
            isPrimaryKey: false,
            relation: <RelationConfiguration<"notifications_template">>{
                schema: "notifications_template",
                target: "id"
            },
        },
        entity: {
            type: "Enum!",
            isPrimaryKey: false,
            isArray: false,
            enum: {
                variants: {
                    ChangeUserPassword: "pages.notification_config.list.fields.entity-enum.ChangeUserPassword"
                }
            }
        },
        event_type: {
            type: "Enum!",
            isPrimaryKey: false,
            isArray: false,
            enum: {
                variants: {
                    created: "pages.notification_config.list.fields.event_type-enum.created"
                }
            }
        },
        channel: {
            type: "Enum!",
            isPrimaryKey: false,
            isArray: false,
            enum: {
                variants: {
                    mail: "pages.notification_config.list.fields.channel-enum.mail"
                }
            }
        }
    },
    isChangeable: true,
    isCreatable: true,
    isDeletable: true,
}

export default notification_config;
