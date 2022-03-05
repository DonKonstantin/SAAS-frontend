import {Collection} from "../../services/types";
import notifications_template from "./NotificationsTemplate";
import notification_config from "./NotificationConfig";
import file from "./File";

/**
 * Основные схемы данных GraphQL. Содержат связи между сущностями,
 * настройки типов данны
 */
export class Schemas {
    // Параметры схемы сущности Домен
    domain: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            active: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
    };

    // Параметры схемы сущности Проект
    project: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            active: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            parent: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"domain">>{
                    schema: "domain",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
    };

    // Параметры схемы сущности Категория Разрешений
    permission_category: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false
            },
            level: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        realm: "pages.permission_category.list.fields.level-enum.realm",
                        domain: "pages.permission_category.list.fields.level-enum.domain",
                        project: "pages.permission_category.list.fields.level-enum.project"
                    }
                }
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
    };

    // Параметры схемы сущности Разрешение
    permission: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false
            },
            category_id: {
                type: "ID!",
                isArray: false,
                isPrimaryKey: false,
                relation: <RelationConfiguration<"permission_category">>{
                    schema: "permission_category",
                    target: "id",
                },
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
    };

    // Параметры схемы сущности Роль
    role: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false
            },
            level: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        realm: "Реалм",
                        domain: "Домен",
                        project: "Проект"
                    }
                }
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            permissions_id: {
                type: "ID!",
                isArray: true,
                isPrimaryKey: false,
                relation: <RelationConfiguration<"permission">>{
                    schema: "permission",
                    target: "id",
                },
            },
            structure_item_id: {
                type: "ID!",
                isArray: false,
                isPrimaryKey: false,
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
    };

    // Параметры схемы сущности Пользователь
    user: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false
            },
            email: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            first_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            last_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            roles_id: {
                type: "ID!",
                isArray: true,
                isPrimaryKey: false,
                relation: <RelationConfiguration<"role">>{
                    schema: "role",
                    target: "id",
                },
            },
            active: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            }
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
    };
    // Шаблоны для рассылок
    notifications_template = notifications_template
    notification_config = notification_config
    file = file
}

/**
 * Параметры поля схемы GraphQL
 */
type SchemaKey = keyof Schemas
export type FieldType = "ID" | "Int" | "String" | "Float" | "Boolean" | "DateTime" | "ID!" | "Int!" | "String!" | "Float!" | "Boolean!" | "DateTime!" | "Enum" | "Enum!"
export class SchemaField {
    type: FieldType;
    isPrimaryKey: boolean;
    isArray: boolean;
    relation?: RelationConfiguration<any>;
    enum?: EnumConfiguration
}

type EnumConfiguration = {
    variants: Collection<string>
}

/**
 * Параметры отношения
 */
type Field<T extends SchemaKey> = keyof Schemas[T]["fields"]
export type RelationConfiguration<M extends SchemaKey> = {
    schema: M
    target: Field<M>
}

/**
 * Параметры схемы
 */
type FieldsCollection = {[P: string]: SchemaField}
export interface Schema {
    fields: FieldsCollection
    isCreatable: boolean
    isDeletable: boolean
    isChangeable: boolean
    subscriptionKey?: string
}
