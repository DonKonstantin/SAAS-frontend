/**
 * Основные схемы данных GraphQL. Содержат связи между сущностями,
 * настройки типов данны
 */
import {Collection} from "../../services/types";

export class Schemas {

    // Параметры схемы сущности пользователя
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
                // relation: <RelationConfiguration<"role">>{
                //     schema: "role",
                //     target: "id",
                // },
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
type RelationConfiguration<M extends SchemaKey> = {
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