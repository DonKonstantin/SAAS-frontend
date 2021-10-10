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
                relation: <RelationConfiguration<"role">>{
                    schema: "role",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "User",
    };

    // Параметры схемы сущности роли
    role: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
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
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "Role",
    };

    // Параметры для схемы сущности Permission
    permission: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false,
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "Permission",
    };

    // Параметры схемы сущности языка
    language: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            is_default: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_right_text_align: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_secondary_default_for_admin: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            translate_code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "Language",
    };

    // Параметры схемы сущности локализованного сообщения
    localized_message: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false
            },
            lang_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false
            },
            message: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "LocalizedMessage",
    };

    // Параметры схемы сущности валюты
    currency: Schema = {
        fields: {
            id: {
                type: "ID!",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            course: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false
            },
            nominal: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            glyph: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            is_default_for_services: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_default_for_transport: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            last_update_date: {
                type: "DateTime",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            conversion_fee_percent: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            accuracy_in: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            rounding_rule_in: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "large": "В большую сторону",
                        "lesser": "В меньшую сторону",
                        "math": "По математике",
                    },
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "Currency",
    };

    // Параметры схемы сущности локации
    locations: Schema = {
        fields: {
            id: {
                type: "Int",
                isPrimaryKey: true,
                isArray: false
            },
            children: {
                type: "Int",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            parent: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            is_country: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_user_searchable: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            symbol_code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            import_id: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            populated_area: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            population: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            search_tags: {
                type: "String",
                isPrimaryKey: false,
                isArray: true,
            },
            latitude: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false,
            },
            longitude: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false,
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "Locations",
    };

    // Параметры схемы сущности локации
    location: Schema = {
        fields: {
            id: {
                type: "Int",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            parent: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            is_country: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_user_searchable: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            symbol_code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            import_id: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            populated_area: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            population: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            search_tags: {
                type: "String",
                isPrimaryKey: false,
                isArray: true,
            },
            latitude: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false,
            },
            longitude: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false,
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "Locations",
    };

    // Параметры схемы сущности налога
    tax: Schema = {
        fields: {
            id: {
                type: "Int",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            amount: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
            },
            is_default: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false,
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "Tax",
    };

    // Схема, описывающая сущность файлов
    file: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            name_original: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            mime_type: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            size: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            created_at: {
                type: "DateTime!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: false,
        isCreatable: false,
        isDeletable: true,
        subscriptionKey: "File",
    };

    // Параметры схемы сущности подрядчика
    contractor: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            default_abbreviation: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_abbreviations: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            files: {
                type: "ID",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"file">>{
                    schema: "file",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "Contractor",
    };

    // Параметры схемы сущности типов груза
    transport_cargo_type: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            priority: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "TransportCargoType",
    };

    // Параметры схемы сущности группы типов груза
    transport_cargo_type_group: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "TransportCargoTypeGroup",
    };

    transport_unit_group: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            accuracy: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            rounding_rule: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "large": "В большую сторону",
                        "lesser": "В меньшую сторону",
                        "math": "По математике",
                    },
                },
            },
            unit_symbol: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            cargo_type_groups: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_cargo_type_group">>{
                    schema: "transport_cargo_type_group",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "TransportUnitGroup",
    };

    carrier: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            default_abbreviation: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_abbreviations: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            files: {
                type: "ID",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"file">>{
                    schema: "file",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "Carrier",
    };

    transport_unit: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            accuracy_in: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            rounding_rule_in: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "large": "В большую сторону",
                        "lesser": "В меньшую сторону",
                        "math": "По математике",
                    },
                },
            },
            accuracy_out: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            rounding_rule_out: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "large": "В большую сторону",
                        "lesser": "В меньшую сторону",
                        "math": "По математике",
                    },
                },
            },
            unit_symbol: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_unit_symbols: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            unit_group: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_unit_group">>{
                    schema: "transport_unit_group",
                    target: "id",
                },
            },
            length: {
                type: "Float",
                isPrimaryKey: false,
                isArray: false
            },
            width: {
                type: "Float",
                isPrimaryKey: false,
                isArray: false
            },
            normative_height_of_stacking: {
                type: "Float",
                isPrimaryKey: false,
                isArray: false
            },
            is_default_for_group: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            convertation_coefficient: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportUnit",
    };

    // Группы надбавок
    transport_allowance_group: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "TransportAllowanceGroup",
    };

    // Группы надбавок (Только для страницы редактирования)
    transport_allowance_group_change: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "TransportAllowanceGroup",
    };

    transport_allowance: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            allowance_group: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_allowance_group">>{
                    schema: "transport_allowance_group",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportAllowance",
    };

    transport_offer_condition: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            unit_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_unit">>{
                    schema: "transport_unit",
                    target: "id",
                },
            },
            min_value: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false
            },
            max_value: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false
            },
            price: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false
            },
            information_price: {
                type: "Float",
                isPrimaryKey: false,
                isArray: false
            },
            tax_id: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"tax">>{
                    schema: "tax",
                    target: "id",
                },
            },
            currency_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"currency">>{
                    schema: "currency",
                    target: "id",
                },
            },
            is_fixed_price: {
                type: "Boolean",
                isPrimaryKey: false,
                isArray: false
            },
            is_min_value_not_limited: {
                type: "Boolean",
                isPrimaryKey: false,
                isArray: false
            },
            is_max_value_not_limited: {
                type: "Boolean",
                isPrimaryKey: false,
                isArray: false
            },
            is_tax_included_in_price: {
                type: "Boolean",
                isPrimaryKey: false,
                isArray: false
            },
            group_num: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            minimal_payment_price: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportOfferCondition",
    };

    transport_allowance_offer: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            allowance_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_allowance">>{
                    schema: "transport_allowance",
                    target: "id",
                },
            },
            offer_conditions: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_offer_condition">>{
                    schema: "transport_offer_condition",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportAllowanceOffer",
    };

    transport_container_affiliation: Schema = {
        fields: {
            id: {
                type: "Int!",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "TransportContainerAffiliation",
    };

    transport_container_type: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportContainerType",
    };

    transport_container: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            container_type: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_container_type">>{
                    schema: "transport_container_type",
                    target: "id",
                },
            },
            is_default_for_container_type: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportContainer",
    };

    transport_delivery_mod: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "TransportDeliveryMod",
    };

    transport_dropoff: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            contractor_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"contractor">>{
                    schema: "contractor",
                    target: "id",
                },
            },
            carrier_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"carrier">>{
                    schema: "carrier",
                    target: "id",
                },
            },
            price: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false
            },
            currency_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"currency">>{
                    schema: "currency",
                    target: "id",
                },
            },
            tax_id: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"tax">>{
                    schema: "tax",
                    target: "id",
                },
            },
            is_tax_included: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            from_location_ids: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            to_location_ids: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            container_ids: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_container">>{
                    schema: "transport_container",
                    target: "id",
                },
            },
            is_container_usage_in_another_contractor_service_allowed: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportDropOff",
    };

    transport_pickon: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            contractor_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"contractor">>{
                    schema: "contractor",
                    target: "id",
                },
            },
            carrier_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"carrier">>{
                    schema: "carrier",
                    target: "id",
                },
            },
            price: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false
            },
            currency_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"currency">>{
                    schema: "currency",
                    target: "id",
                },
            },
            tax_id: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"tax">>{
                    schema: "tax",
                    target: "id",
                },
            },
            is_tax_included: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            from_location_ids: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            to_location_ids: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            container_ids: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_container">>{
                    schema: "transport_container",
                    target: "id",
                },
            },
            is_container_usage_in_another_contractor_service_allowed: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportPickOn",
    };

    transport_container_rent: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            contractor_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"contractor">>{
                    schema: "contractor",
                    target: "id",
                },
            },
            carrier_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"carrier">>{
                    schema: "carrier",
                    target: "id",
                },
            },
            price: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false
            },
            currency_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"currency">>{
                    schema: "currency",
                    target: "id",
                },
            },
            tax_id: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"tax">>{
                    schema: "tax",
                    target: "id",
                },
            },
            is_tax_included: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            from_location_ids: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            to_location_ids: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            container_ids: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_container">>{
                    schema: "transport_container",
                    target: "id",
                },
            },
            is_container_usage_in_another_contractor_service_allowed: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportContainerRent",
    };

    transport_loading_condition: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            is_terminal_services_included_on_loading: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_terminal_services_included_on_unloading: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_terminal_allowances_included: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_loading_on_non_terminal_only: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_first_shoulder_only: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportLoadingCondition",
    };

    transport_unloading_condition: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            is_terminal_services_included_on_loading: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_terminal_services_included_on_unloading: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_terminal_allowances_included: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_unloading_on_non_terminal_only: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_last_shoulder_only: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportUnloadingCondition",
    };

    transport_start_transporting_condition: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            is_terminal_required: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_terminal_services_should_be_included_on_route_start: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_terminal_allowances_should_be_included_on_route_start: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_terminal_services_excluded_on_export_terminal_prekeridge: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_terminal_allowances_excluded_on_export_terminal_prekeridge: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_prekeridge_available: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_prekeridge: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportStartTransportingCondition",
    };

    transport_stop_transporting_condition: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            is_terminal_required: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_terminal_services_should_be_included_on_route_end: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
            is_terminal_allowances_should_be_included_on_route_end: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportStopTransportingCondition",
    };

    transport_type: Schema = {
        fields: {
            id: {
                type: "Int",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            transporting_default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            transporting_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "TransportType",
    };

    transport_shoulder_type: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            transport_type: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_type">>{
                    schema: "transport_type",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "TransportShoulderType",
    };

    transport_terminal: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            default_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_names: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            location_id: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            default_abbreviation: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            localized_abbreviations: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"localized_message">>{
                    schema: "localized_message",
                    target: "id",
                },
            },
            files: {
                type: "ID",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"file">>{
                    schema: "file",
                    target: "id",
                },
            },
            symbol_code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            latitude: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false,
            },
            longitude: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false,
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportTerminal",
    };

    transport_terminal_offer: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            delivery_modes: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_delivery_mod">>{
                    schema: "transport_delivery_mod",
                    target: "id",
                },
            },
            terminal_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_terminal">>{
                    schema: "transport_terminal",
                    target: "id",
                },
            },
            cargo_type_group: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_cargo_type_group">>{
                    schema: "transport_cargo_type_group",
                    target: "id",
                },
            },
            containers: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_container">>{
                    schema: "transport_container",
                    target: "id",
                },
            },
            loading_offers: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_container">>{
                    schema: "transport_container",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportTerminalOffer",
    };

    transport_terminal_loading_unloading_offer: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            offer_conditions: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_offer_condition">>{
                    schema: "transport_offer_condition",
                    target: "id",
                },
            },
            allowance_offers: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_allowance_offer">>{
                    schema: "transport_allowance_offer",
                    target: "id",
                },
            },
            loading_shoulder_types: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_shoulder_type">>{
                    schema: "transport_shoulder_type",
                    target: "id",
                },
            },
            unloading_shoulder_types: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_shoulder_type">>{
                    schema: "transport_shoulder_type",
                    target: "id",
                },
            },
            is_loading_to_unknown_transport: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false,
            },
            is_unloading_from_unknown_transport: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false,
            },
            service_type: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "loading_and_unloading": "Погрузка + разгрузка",
                        "loading": "Погрузка",
                        "unloading": "Разгрузка",
                    },
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportTerminalLoadingUnloadingOffer",
    };

    transport_shoulder_step: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            start_terminal_id: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_terminal">>{
                    schema: "transport_terminal",
                    target: "id",
                },
            },
            end_terminal_id: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_terminal">>{
                    schema: "transport_terminal",
                    target: "id",
                },
            },
            transport_type_id: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_type">>{
                    schema: "transport_type",
                    target: "id",
                },
            },
            position: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportShoulderStep",
    };

    transport_shoulder: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            shoulder_type: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_shoulder_type">>{
                    schema: "transport_shoulder_type",
                    target: "id",
                },
            },
            from_location_ids: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            to_location_ids: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"locations">>{
                    schema: "locations",
                    target: "id",
                },
            },
            from_terminal_ids: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_terminal">>{
                    schema: "transport_terminal",
                    target: "id",
                },
            },
            to_terminal_ids: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_terminal">>{
                    schema: "transport_terminal",
                    target: "id",
                },
            },
            contractor_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"contractor">>{
                    schema: "contractor",
                    target: "id",
                },
            },
            carrier_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"carrier">>{
                    schema: "carrier",
                    target: "id",
                },
            },
            distance: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
            },
            distance_unit: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "km": "км",
                        "nm": "мм",
                    }
                }
            },
            shoulder_steps: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_shoulder_step">>{
                    schema: "transport_shoulder_step",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportShoulder",
    };

    transport_shoulder_offer: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            shoulder_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_shoulder">>{
                    schema: "transport_shoulder",
                    target: "id",
                },
            },
            cargo_type_group: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_cargo_type_group">>{
                    schema: "transport_cargo_type_group",
                    target: "id",
                },
            },
            containers: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_container">>{
                    schema: "transport_container",
                    target: "id",
                },
            },
            container_affiliation_id: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_container_affiliation">>{
                    schema: "transport_container_affiliation",
                    target: "id",
                },
            },
            container_nominal_weight: {
                type: "Float!",
                isPrimaryKey: false,
                isArray: false,
            },
            is_danger_cargo_allowed: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false,
            },
            is_container_usage_in_another_carrier_service_allowed: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false,
            },
            is_container_usage_in_another_contractor_service_allowed: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false,
            },
            loading_condition_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_loading_condition">>{
                    schema: "transport_loading_condition",
                    target: "id",
                },
            },
            unloading_condition_id: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"transport_unloading_condition">>{
                    schema: "transport_unloading_condition",
                    target: "id",
                },
            },
            offer_conditions: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_offer_condition">>{
                    schema: "transport_offer_condition",
                    target: "id",
                },
            },
            allowance_offers: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_allowance_offer">>{
                    schema: "transport_allowance_offer",
                    target: "id",
                },
            },
            free_time_for_container_usage_on_start_terminal: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
            },
            free_time_for_container_usage_on_end_terminal: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
            },
            active_from: {
                type: "DateTime!",
                isPrimaryKey: false,
                isArray: false,
            },
            active_to: {
                type: "DateTime!",
                isPrimaryKey: false,
                isArray: false,
            },
            delivery_modes: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: true,
                relation: <RelationConfiguration<"transport_delivery_mod">>{
                    schema: "transport_delivery_mod",
                    target: "id",
                },
            },
            is_empty_container_returning_included: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false,
            },
            is_empty_container_collecting_included: {
                type: "Boolean!",
                isPrimaryKey: false,
                isArray: false,
            },
            delivery_time: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TransportShoulderOffer",
    };

    location_import_task: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            processed_objects_quantity: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            status: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "on_preparation": "Задание подготавливается",
                        "in_queue": "В очереди",
                        "in_progress": "В обработке",
                        "complete": "Завершена",
                        "error": "Ошибка",
                        "cancelled": "Отменена",
                        "paused": "Приостановлена",
                    },
                },
            },
            total_objects_quantity: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: false,
        isCreatable: true,
        isDeletable: false,
        subscriptionKey: "ImportTask",
    };

    shoulder_import_task: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            processed_objects_quantity: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            status: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "on_preparation": "Задание подготавливается",
                        "in_queue": "В очереди",
                        "in_progress": "В обработке",
                        "complete": "Завершена",
                        "error": "Ошибка",
                        "cancelled": "Отменена",
                        "paused": "Приостановлена",
                    },
                },
            },
            total_objects_quantity: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: false,
        isCreatable: true,
        isDeletable: false,
        subscriptionKey: "ImportTask",
    };

    import_task: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            processed_objects_quantity: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            status: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "on_preparation": "Задание подготавливается",
                        "in_queue": "В очереди",
                        "in_progress": "В обработке",
                        "complete": "Завершена",
                        "error": "Ошибка",
                        "cancelled": "Отменена",
                        "paused": "Приостановлена",
                    },
                },
            },
            type: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "location_import": "Импорт гео-объектов",
                    },
                },
            },
            total_objects_quantity: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: false,
        isCreatable: true,
        isDeletable: false,
        subscriptionKey: "ImportTask",
    };

    order: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            customer_name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            customer_email: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            customer_phone: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            currency_id: {
                type: "ID",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"currency">>{
                    schema: "currency",
                    target: "id",
                },
            },
            currency_rate: {
                type: "Float",
                isPrimaryKey: false,
                isArray: false
            },
            currency_nominal: {
                type: "Float",
                isPrimaryKey: false,
                isArray: false
            },
            order_price: {
                type: "Float",
                isPrimaryKey: false,
                isArray: false
            },
            language_id: {
                type: "ID",
                isPrimaryKey: false,
                isArray: false
            },
            date: {
                type: "DateTime!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "Order",
    };

    pre_order: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            currency_id: {
                type: "ID",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"currency">>{
                    schema: "currency",
                    target: "id",
                },
            },
            currency_rate: {
                type: "Float",
                isPrimaryKey: false,
                isArray: false
            },
            currency_nominal: {
                type: "Float",
                isPrimaryKey: false,
                isArray: false
            },
            order_price: {
                type: "Float",
                isPrimaryKey: false,
                isArray: false
            },
            language_id: {
                type: "ID",
                isPrimaryKey: false,
                isArray: false
            },
            date: {
                type: "DateTime!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: false,
        isDeletable: false,
        subscriptionKey: "PreOrder",
    };

    tnved_company_category: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            company_id: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: true
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TnvedCompanyCategory",
    };

    tnved_company_product: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            company_id: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
            },
            category_id: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"tnved_company_category">>{
                    schema: "tnved_company_category",
                    target: "id",
                },
            },
            sku: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: true
            },
            tnved_code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TnvedCompanyProduct",
    };

    excel_file: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            company_id: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            created_at: {
                type: "DateTime!",
                isPrimaryKey: false,
                isArray: false,
            },
            last_modified: {
                type: "DateTime!",
                isPrimaryKey: false,
                isArray: false,
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "ExcelFile",
    };

    tnved_company_specification: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            company_id: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false,
            },
            base_data_file_id: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"excel_file">>{
                    schema: "excel_file",
                    target: "id",
                },
            },
            base_specification_file_id: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"excel_file">>{
                    schema: "excel_file",
                    target: "id",
                },
            },
            detail_specification_file_id: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"excel_file">>{
                    schema: "excel_file",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TnvedCompanySpecification",
    };

    tnved_code: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            description: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            path: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            vendor: {
                type: "ID!",
                isPrimaryKey: false,
                isArray: false,
            },
            parent: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"tnved_code">>{
                    schema: "tnved_code",
                    target: "id",
                },
            },
            created_at: {
                type: "DateTime!",
                isPrimaryKey: false,
                isArray: false,
            },
            last_modified: {
                type: "DateTime!",
                isPrimaryKey: false,
                isArray: false,
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TnvedCode",
    };

    tnved_code_edit: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            code: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            name: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            description: {
                type: "String!",
                isPrimaryKey: false,
                isArray: false,
            },
            vendor: {
                type: "ID",
                isPrimaryKey: false,
                isArray: false,
            },
            parent: {
                type: "Int",
                isPrimaryKey: false,
                isArray: false,
                relation: <RelationConfiguration<"tnved_code">>{
                    schema: "tnved_code",
                    target: "id",
                },
            },
        },
        isChangeable: true,
        isCreatable: true,
        isDeletable: true,
        subscriptionKey: "TnvedCode",
    };

    tnved_products_import_task: Schema = {
        fields: {
            id: {
                type: "ID",
                isPrimaryKey: true,
                isArray: false
            },
            processed_objects_quantity: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
            status: {
                type: "Enum!",
                isPrimaryKey: false,
                isArray: false,
                enum: {
                    variants: {
                        "on_preparation": "Задание подготавливается",
                        "in_queue": "В очереди",
                        "in_progress": "В обработке",
                        "complete": "Завершена",
                        "error": "Ошибка",
                        "cancelled": "Отменена",
                        "paused": "Приостановлена",
                    },
                },
            },
            total_objects_quantity: {
                type: "Int!",
                isPrimaryKey: false,
                isArray: false
            },
        },
        isChangeable: false,
        isCreatable: true,
        isDeletable: false,
        subscriptionKey: "ImportTask",
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