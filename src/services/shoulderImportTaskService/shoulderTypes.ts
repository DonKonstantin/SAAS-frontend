import {
    FieldConfiguration,
    FieldConfigurationCollection, FieldSettings, ImportProcessingConfigurationType, Settings,
} from "./baseTypes";
import {currencyDefaultGetter} from "../currencyDefaultGetter";
import {taxDefaultGetter} from "../taxDefaultGetter";
import {v4} from "uuid";

// Плечо для импорта
export type Shoulder = {
    import_id: string               // Временный ID
    id: string | null               // ID плеча
    shoulder_type: string | null    // Тип плеча
    from_location_ids: string[]     // ID пунктов отправления плеча. (Не обязательно указывать, если указаны терминалы отправления)
    to_location_ids: string[]       // ID пунктов назначения плеча. (Не обязательно указывать, если указаны терминалы назначения)
    from_terminal_ids: string[]     // ID терминалов отправления плеча. (Не обязательно указывать)
    to_terminal_ids: string[]       // ID пунктов назначения плеча. (Не обязательно указывать)
    contractor_id: string | null    // ID подрядчика
    carrier_id: string | null       // ID перевозчика
    distance: number                // Расстояние перевозки
    distance_unit: string           // Единица измерения расстояния перевозки
    shoulder_steps: ShoulderStep[]  // Шаги плеча. Используется в мультимодальных плечах.
    offers: ShoulderOffer[]         // Ценовые предложения плеча
};

// Дефолтная конфигурация для импорта плеч
export class DefaultShoulderSettings implements Settings<Shoulder> {
    import_id: FieldSettings<Shoulder, "import_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "import_id",
        type: "uuid"
    };
    id: FieldSettings<Shoulder, "id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "id",
        type: "none"
    };
    shoulder_type: FieldSettings<Shoulder, "shoulder_type", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "shoulder_type",
        type: "none"
    };
    from_location_ids: FieldSettings<Shoulder, "from_location_ids", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "from_location_ids",
        type: "none"
    };
    from_terminal_ids: FieldSettings<Shoulder, "from_terminal_ids", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "from_terminal_ids",
        type: "none"
    };
    to_location_ids: FieldSettings<Shoulder, "to_location_ids", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "to_location_ids",
        type: "none"
    };
    to_terminal_ids: FieldSettings<Shoulder, "to_terminal_ids", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "to_terminal_ids",
        type: "none"
    };
    carrier_id: FieldSettings<Shoulder, "carrier_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "carrier_id",
        type: "none"
    };
    contractor_id: FieldSettings<Shoulder, "contractor_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "contractor_id",
        type: "none"
    };
    distance: FieldSettings<Shoulder, "distance", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "distance",
        type: "none"
    };
    distance_unit: FieldSettings<Shoulder, "distance_unit", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "distance_unit",
        type: "none"
    };
    offers: FieldSettings<Shoulder, "offers", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "offers",
        type: "none"
    };
    shoulder_steps: FieldSettings<Shoulder, "shoulder_steps", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "shoulder_steps",
        type: "none"
    };
}

// Конфигурация полей для импорта плеч
export class ShoulderConfiguration implements FieldConfigurationCollection<Shoulder> {
    import_id: FieldConfiguration<Shoulder, "import_id"> = {
        field: "import_id",
        fieldIsNullable: false,
        fieldTitle: "Временный ID",
        fieldValueType: "string",
        isConfigurable: true,
        defaultValue: async () => v4(),
    };
    id: FieldConfiguration<Shoulder, "id"> = {
        field: "id",
        fieldIsNullable: true,
        fieldTitle: "ID",
        fieldValueType: "string",
        isConfigurable: true,
    };
    shoulder_type: FieldConfiguration<Shoulder, "shoulder_type"> = {
        field: "shoulder_type",
        fieldIsNullable: false,
        fieldTitle: "Тип плеча",
        fieldValueType: "string",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportShoulderType",
            relatedEntitySchema: "transport_shoulder_type",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
    };
    from_location_ids: FieldConfiguration<Shoulder, "from_location_ids"> = {
        field: "from_location_ids",
        fieldIsNullable: false,
        fieldTitle: "Локации отправления",
        fieldValueType: "string",
        isConfigurable: true,
        fieldIsArray: true,
        relation: {
            relatedEntityCode: "Location",
            relatedEntitySchema: "locations",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
    };
    from_terminal_ids: FieldConfiguration<Shoulder, "from_terminal_ids"> = {
        field: "from_terminal_ids",
        fieldIsNullable: false,
        fieldTitle: "Терминалы отправления",
        fieldValueType: "string",
        isConfigurable: true,
        fieldIsArray: true,
        relation: {
            relatedEntityCode: "TransportTerminal",
            relatedEntitySchema: "transport_terminal",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
    };
    to_location_ids: FieldConfiguration<Shoulder, "to_location_ids"> = {
        field: "to_location_ids",
        fieldIsNullable: false,
        fieldTitle: "Локации назначения",
        fieldValueType: "string",
        isConfigurable: true,
        fieldIsArray: true,
        relation: {
            relatedEntityCode: "Location",
            relatedEntitySchema: "locations",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
    };
    to_terminal_ids: FieldConfiguration<Shoulder, "to_terminal_ids"> = {
        field: "to_terminal_ids",
        fieldIsNullable: false,
        fieldTitle: "Терминал назначения",
        fieldValueType: "string",
        isConfigurable: true,
        fieldIsArray: true,
        relation: {
            relatedEntityCode: "TransportTerminal",
            relatedEntitySchema: "transport_terminal",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
    };
    carrier_id: FieldConfiguration<Shoulder, "carrier_id"> = {
        field: "carrier_id",
        fieldIsNullable: false,
        fieldTitle: "Перевозчик",
        fieldValueType: "string",
        isConfigurable: true,
        fieldIsArray: false,
        relation: {
            relatedEntityCode: "Carrier",
            relatedEntitySchema: "carrier",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        }
    };
    contractor_id: FieldConfiguration<Shoulder, "contractor_id"> = {
        field: "contractor_id",
        fieldIsNullable: false,
        fieldTitle: "Подрядчик",
        fieldValueType: "string",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "Contractor",
            relatedEntitySchema: "contractor",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
    };
    distance: FieldConfiguration<Shoulder, "distance"> = {
        field: "distance",
        fieldIsNullable: false,
        fieldTitle: "Расстояние перевозки",
        fieldValueType: "number",
        isConfigurable: true,
        fieldIsArray: false,
    };
    distance_unit: FieldConfiguration<Shoulder, "distance_unit"> = {
        field: "distance_unit",
        fieldIsNullable: false,
        fieldTitle: "Единица измерения расстояния",
        fieldValueType: "enum",
        isConfigurable: true,
        enum: {
            variants: {
                km: {
                    title: "Километры",
                    shortName: "км",
                    aliases: [
                        "km", "км"
                    ],
                },
                mm: {
                    title: "Морские мили",
                    shortName: "мм",
                    aliases: [
                        "mm", "мили", "мм"
                    ],
                },
            }
        },
        defaultValue: async () => {
            return "km"
        },
    };
    offers: FieldConfiguration<Shoulder, "offers"> = {
        field: "offers",
        fieldIsNullable: false,
        fieldTitle: "offers",
        fieldValueType: "string",
        isConfigurable: false,
        fieldIsArray: true,
    };
    shoulder_steps: FieldConfiguration<Shoulder, "shoulder_steps"> = {
        field: "shoulder_steps",
        fieldIsNullable: false,
        fieldTitle: "shoulder_steps",
        fieldValueType: "string",
        isConfigurable: false,
        fieldIsArray: true,
    };
}

// Сущность ценового предложения плеча
export type ShoulderOffer = {
    import_id: string                                        // Временный ID ценового предложения
    id: string | null                                        // ID ценового предложения для плеча
    cargo_type_group: string | null                          // ID группы типов груза
    containers: string[]                                     // ID контейнеров текущего ценового предложения
    container_affiliation_id: number | null                  // ID принадлежности контейнера
    container_nominal_weight: number                         // Номинальный вес контейнера (кг)
    is_danger_cargo_allowed: boolean                         // Перевозка опасных грузов разрешена
    loading_condition_id: string | null                      // ID условия погрузки
    unloading_condition_id: string | null                    // ID условия разгрузки
    offer_conditions: ShoulderOfferCondition[]               // Условия ценовых предложений для текущего ценового предложения
    allowance_offers: AllowanceOffer[]                       // Ценовые предложений надбавок текущего предложения
    free_time_for_container_usage_on_start_terminal: number  // Свободное использование контейнера в пункте отправления
    free_time_for_container_usage_on_end_terminal: number    // Свободное использование контейнера в пункте назначения
    active_from: Date                                        // Ценовое предложение активно с... (дата)
    active_to: Date                                          // Ценовое предложение активно по... (дата)
    delivery_modes: string[]                                 // ID режимов доставки
    is_empty_container_returning_included: boolean           // Возврат порожнего оборудования включен
    is_empty_container_collecting_included: boolean          // Получение порожнего оборудования включено
    delivery_time: number                                    // Срок перевозки (дней)
};

// Дефолтная конфигурация для надбавок для ценовых предложений плеча
export class DefaultShoulderOfferSettings implements Settings<ShoulderOffer> {
    import_id: FieldSettings<ShoulderOffer, "import_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "import_id",
        type: "uuid"
    };
    id: FieldSettings<ShoulderOffer, "id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "id",
        type: "none"
    };
    active_from: FieldSettings<ShoulderOffer, "active_from", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "active_from",
        type: "none"
    };
    active_to: FieldSettings<ShoulderOffer, "active_to", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "active_to",
        type: "none"
    };
    allowance_offers: FieldSettings<ShoulderOffer, "allowance_offers", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "allowance_offers",
        type: "none"
    };
    cargo_type_group: FieldSettings<ShoulderOffer, "cargo_type_group", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "cargo_type_group",
        type: "none"
    };
    containers: FieldSettings<ShoulderOffer, "containers", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "containers",
        type: "none"
    };
    container_affiliation_id: FieldSettings<ShoulderOffer, "container_affiliation_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "container_affiliation_id",
        type: "none"
    };
    container_nominal_weight: FieldSettings<ShoulderOffer, "container_nominal_weight", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "container_nominal_weight",
        type: "none"
    };
    is_danger_cargo_allowed: FieldSettings<ShoulderOffer, "is_danger_cargo_allowed", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "is_danger_cargo_allowed",
        type: "none"
    };
    is_empty_container_returning_included: FieldSettings<ShoulderOffer, "is_empty_container_returning_included", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "is_empty_container_returning_included",
        type: "none"
    };
    is_empty_container_collecting_included: FieldSettings<ShoulderOffer, "is_empty_container_collecting_included", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "is_empty_container_collecting_included",
        type: "none"
    };
    loading_condition_id: FieldSettings<ShoulderOffer, "loading_condition_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "loading_condition_id",
        type: "none"
    };
    unloading_condition_id: FieldSettings<ShoulderOffer, "unloading_condition_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "unloading_condition_id",
        type: "none"
    };
    delivery_modes: FieldSettings<ShoulderOffer, "delivery_modes", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "delivery_modes",
        type: "none"
    };
    delivery_time: FieldSettings<ShoulderOffer, "delivery_time", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "delivery_time",
        type: "none"
    };
    free_time_for_container_usage_on_start_terminal: FieldSettings<ShoulderOffer, "free_time_for_container_usage_on_start_terminal", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "free_time_for_container_usage_on_start_terminal",
        type: "none"
    };
    free_time_for_container_usage_on_end_terminal: FieldSettings<ShoulderOffer, "free_time_for_container_usage_on_end_terminal", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "free_time_for_container_usage_on_end_terminal",
        type: "none"
    };
    offer_conditions: FieldSettings<ShoulderOffer, "offer_conditions", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "offer_conditions",
        type: "none"
    };
}

// Конфигурация для импорта ценового предложения плеча
export class ShoulderOfferConfiguration implements FieldConfigurationCollection<ShoulderOffer> {
    import_id: FieldConfiguration<ShoulderOffer, "import_id"> = {
        field: "import_id",
        fieldIsNullable: false,
        fieldTitle: "Временный ID",
        fieldValueType: "string",
        isConfigurable: true,
        defaultValue: async () => v4(),
    };
    id: FieldConfiguration<ShoulderOffer, "id"> = {
        field: "id",
        fieldIsNullable: true,
        fieldTitle: "ID",
        fieldValueType: "string",
        isConfigurable: true,
    };
    active_from: FieldConfiguration<ShoulderOffer, "active_from"> = {
        field: "active_from",
        fieldIsNullable: false,
        fieldTitle: "Срок действия с",
        fieldValueType: "dateTime",
        isConfigurable: true,
        dateConvertation: date => {
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0))
        },
        dateNormalization: date => {
            return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0)
        },
        defaultValue: async () => {
            const date = new Date();
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0))
        },
    };
    active_to: FieldConfiguration<ShoulderOffer, "active_to"> = {
        field: "active_to",
        fieldIsNullable: false,
        fieldTitle: "Срок действия по",
        fieldValueType: "dateTime",
        isConfigurable: true,
        dateConvertation: date => {
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59))
        },
        dateNormalization: date => {
            return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59)
        },
        defaultValue: async () => {
            let date = new Date();
            let nextMonthDate = new Date(date.setMonth(date.getMonth() + 1));
            nextMonthDate = new Date(nextMonthDate.setDate(0));

            return new Date(Date.UTC(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), nextMonthDate.getDate(), 23, 59, 59))
        },
    };
    allowance_offers: FieldConfiguration<ShoulderOffer, "allowance_offers"> = {
        field: "allowance_offers",
        fieldIsNullable: false,
        fieldTitle: "Надбавки",
        fieldValueType: "string",
        isConfigurable: false,
        fieldIsArray: true,
    };
    cargo_type_group: FieldConfiguration<ShoulderOffer, "cargo_type_group"> = {
        field: "cargo_type_group",
        fieldIsNullable: false,
        fieldTitle: "Тип груза",
        fieldValueType: "string",
        isConfigurable: true,
        defaultValue: async () => "1",
        relation: {
            relatedEntityCode: "TransportCargoTypeGroup",
            relatedEntitySchema: "transport_cargo_type_group",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        }
    };
    containers: FieldConfiguration<ShoulderOffer, "containers"> = {
        field: "containers",
        fieldIsNullable: false,
        fieldTitle: "Контейнеры",
        fieldValueType: "string",
        fieldIsArray: true,
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportContainer",
            relatedEntitySchema: "transport_container",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
        defaultValue: async () => {
            return [];
        },
    };
    container_affiliation_id: FieldConfiguration<ShoulderOffer, "container_affiliation_id"> = {
        field: "container_affiliation_id",
        fieldIsNullable: true,
        fieldTitle: "Принадлежность контейнера",
        fieldValueType: "number",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportContainerAffiliation",
            relatedEntitySchema: "transport_container_affiliation",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => parseInt(option.id),
        },
        defaultValue: async () => {
            return 1;
        },
    };
    container_nominal_weight: FieldConfiguration<ShoulderOffer, "container_nominal_weight"> = {
        field: "container_nominal_weight",
        fieldIsNullable: false,
        fieldTitle: "Номинальная загрузка контейнера (Кг)",
        fieldValueType: "number",
        isConfigurable: true,
        defaultValue: async () => {
            return 0;
        },
    };
    is_danger_cargo_allowed: FieldConfiguration<ShoulderOffer, "is_danger_cargo_allowed"> = {
        field: "is_danger_cargo_allowed",
        fieldIsNullable: false,
        fieldTitle: "Перевозка опасных грузов разрешена",
        fieldValueType: "boolean",
        isConfigurable: true,
        defaultValue: async () => {
            return false;
        },
    };
    is_empty_container_returning_included: FieldConfiguration<ShoulderOffer, "is_empty_container_returning_included"> = {
        field: "is_empty_container_returning_included",
        fieldIsNullable: false,
        fieldTitle: "Возврат порожнего оборудования включен",
        fieldValueType: "boolean",
        isConfigurable: true,
        defaultValue: async () => {
            return false;
        },
    };
    is_empty_container_collecting_included: FieldConfiguration<ShoulderOffer, "is_empty_container_collecting_included"> = {
        field: "is_empty_container_collecting_included",
        fieldIsNullable: false,
        fieldTitle: "Возврат груженого оборудования включен",
        fieldValueType: "boolean",
        isConfigurable: true,
        defaultValue: async () => {
            return false;
        },
    };
    loading_condition_id: FieldConfiguration<ShoulderOffer, "loading_condition_id"> = {
        field: "loading_condition_id",
        fieldIsNullable: false,
        fieldTitle: "Погрузка",
        fieldValueType: "string",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportLoadingCondition",
            relatedEntitySchema: "transport_loading_condition",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
        defaultValue: async () => {
            return "1";
        },
    };
    unloading_condition_id: FieldConfiguration<ShoulderOffer, "unloading_condition_id"> = {
        field: "unloading_condition_id",
        fieldIsNullable: false,
        fieldTitle: "Разгрузка",
        fieldValueType: "string",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportUnloadingCondition",
            relatedEntitySchema: "transport_unloading_condition",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
        defaultValue: async () => {
            return "1";
        },
    };
    delivery_modes: FieldConfiguration<ShoulderOffer, "delivery_modes"> = {
        field: "delivery_modes",
        fieldIsNullable: false,
        fieldTitle: "Режимы перевозки",
        fieldValueType: "string",
        fieldIsArray: true,
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportDeliveryMod",
            relatedEntitySchema: "transport_delivery_mod",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
        defaultValue: async () => {
            return ["2"];
        },
    };
    delivery_time: FieldConfiguration<ShoulderOffer, "delivery_time"> = {
        field: "delivery_time",
        fieldIsNullable: false,
        fieldTitle: "Срок перевозки (дней)",
        fieldValueType: "number",
        isConfigurable: true,
    };
    free_time_for_container_usage_on_start_terminal: FieldConfiguration<ShoulderOffer, "free_time_for_container_usage_on_start_terminal"> = {
        field: "free_time_for_container_usage_on_start_terminal",
        fieldIsNullable: false,
        fieldTitle: "Свободное исп. контейнера (пункт отпр.)",
        fieldValueType: "number",
        isConfigurable: true,
    };
    free_time_for_container_usage_on_end_terminal: FieldConfiguration<ShoulderOffer, "free_time_for_container_usage_on_end_terminal"> = {
        field: "free_time_for_container_usage_on_end_terminal",
        fieldIsNullable: false,
        fieldTitle: "Свободное исп. контейнера (пункт назн.)",
        fieldValueType: "number",
        isConfigurable: true,
    };
    offer_conditions: FieldConfiguration<ShoulderOffer, "offer_conditions"> = {
        field: "offer_conditions",
        fieldIsNullable: false,
        fieldTitle: "Условия ЦП",
        fieldValueType: "string",
        isConfigurable: false,
        fieldIsArray: true,
    };
}

// Шаг плеча, для мультимодальных плеч
export type ShoulderStep = {
    import_id: string                // Временный ID шага плеча
    id: string | null                // ID шага плеча
    start_terminal_id: number | null // Терминал отправления шага. Null для начала плеча
    end_terminal_id: number | null   // Терминал назначения шага. Null для окончания плеча
    transport_type_id: string        // Тип перевозки на текущем шаге
    position: number                 // Порядковый номер шага
};

// Дефолтная конфигурация для надбавок для шагов плеча
export class DefaultShoulderStepSettings implements Settings<ShoulderStep> {
    import_id: FieldSettings<ShoulderStep, "import_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "import_id",
        type: "uuid"
    };
    id: FieldSettings<ShoulderStep, "id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "id",
        type: "none"
    };
    start_terminal_id: FieldSettings<ShoulderStep, "start_terminal_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "start_terminal_id",
        type: "none"
    };
    end_terminal_id: FieldSettings<ShoulderStep, "end_terminal_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "end_terminal_id",
        type: "none"
    };
    transport_type_id: FieldSettings<ShoulderStep, "transport_type_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "transport_type_id",
        type: "none"
    };
    position: FieldSettings<ShoulderStep, "position", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "position",
        type: "none"
    };
}

// Конфигурация для импорта шагов мультимодальных плеч
export class ShoulderStepConfiguration implements FieldConfigurationCollection<ShoulderStep> {
    import_id: FieldConfiguration<ShoulderStep, "import_id"> = {
        field: "import_id",
        fieldIsNullable: false,
        fieldTitle: "Временный ID",
        fieldValueType: "string",
        isConfigurable: true,
        defaultValue: async () => v4(),
    };
    id: FieldConfiguration<ShoulderStep, "id"> = {
        field: "id",
        fieldIsNullable: true,
        fieldTitle: "ID",
        fieldValueType: "string",
        isConfigurable: true
    };
    start_terminal_id: FieldConfiguration<ShoulderStep, "start_terminal_id"> = {
        field: "start_terminal_id",
        fieldIsNullable: true,
        fieldTitle: "Терминал отправления",
        fieldValueType: "number",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportTerminal",
            relatedEntitySchema: "transport_terminal",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => parseInt(option.id),
        },
    };
    end_terminal_id: FieldConfiguration<ShoulderStep, "end_terminal_id"> = {
        field: "end_terminal_id",
        fieldIsNullable: true,
        fieldTitle: "Терминал назначения",
        fieldValueType: "number",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportTerminal",
            relatedEntitySchema: "transport_terminal",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => parseInt(option.id),
        },
    };
    transport_type_id: FieldConfiguration<ShoulderStep, "transport_type_id"> = {
        field: "transport_type_id",
        fieldIsNullable: false,
        fieldTitle: "Тип перевозки",
        fieldValueType: "string",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportType",
            relatedEntitySchema: "transport_type",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
    };
    position: FieldConfiguration<ShoulderStep, "position"> = {
        field: "position",
        fieldIsNullable: false,
        fieldTitle: "Порядковый номер шага",
        fieldValueType: "number",
        isConfigurable: false
    };
}

// Ценовое предложение для надбавки для ценового предложения плеча
export type AllowanceOffer = {
    import_id: string                          // Временный ID ЦП надбавки
    id: string | null                          // ID ЦП надбавки
    allowance_id: string | null                // ID надбавки, к которой относится ЦП
    is_invoice_allowance: boolean              // Надбавка на накладную
    offer_conditions: ShoulderOfferCondition[] // Условия ЦП для надбавки
}

// Дефолтная конфигурация для надбавок для ценовых предложений
export class DefaultAllowanceOfferSettings implements Settings<AllowanceOffer> {
    import_id: FieldSettings<AllowanceOffer, "import_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "import_id",
        type: "uuid"
    };
    id: FieldSettings<AllowanceOffer, "id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "id",
        type: "none"
    };
    allowance_id: FieldSettings<AllowanceOffer, "allowance_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "allowance_id",
        type: "none"
    };
    is_invoice_allowance: FieldSettings<AllowanceOffer, "is_invoice_allowance", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "is_invoice_allowance",
        type: "none",
    };
    offer_conditions: FieldSettings<AllowanceOffer, "offer_conditions", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "offer_conditions",
        type: "none"
    };
}

// Конфигурация полей для импорта надбавок
export class AllowanceOfferConfiguration implements FieldConfigurationCollection<AllowanceOffer> {
    import_id: FieldConfiguration<AllowanceOffer, "import_id"> = {
        field: "import_id",
        fieldIsNullable: false,
        fieldTitle: "Временный ID",
        fieldValueType: "string",
        isConfigurable: true,
        defaultValue: async () => v4(),
    };
    id: FieldConfiguration<AllowanceOffer, "id"> = {
        field: "id",
        fieldIsNullable: true,
        fieldTitle: "ID",
        fieldValueType: "string",
        isConfigurable: true,
    };
    allowance_id: FieldConfiguration<AllowanceOffer, "allowance_id"> = {
        field: "allowance_id",
        fieldIsNullable: false,
        fieldTitle: "Тип надбавки",
        fieldValueType: "string",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportAllowance",
            relatedEntitySchema: "transport_allowance",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        }
    };
    is_invoice_allowance: FieldConfiguration<AllowanceOffer, "is_invoice_allowance"> = {
        field: "is_invoice_allowance",
        fieldIsNullable: false,
        fieldTitle: "Является надбавкой на накладную",
        fieldValueType: "boolean",
        isConfigurable: true
    };
    offer_conditions: FieldConfiguration<AllowanceOffer, "offer_conditions"> = {
        field: "offer_conditions",
        fieldIsNullable: false,
        fieldTitle: "",
        fieldValueType: "string",
        isConfigurable: false,
        fieldIsArray: true,
    };
}

// Условие стоимости для ценового предложения плеча
export type ShoulderOfferCondition = {
    import_id: string                   // Временный ID условия
    id: string | null                   // ID условия
    unit_id: string | null              // Единица измерения для ЦП
    min_value: number                   // Минимальное значение для условия
    max_value: number                   // Максимальное значение для условия
    price: number                       // Цена
    information_price: number           // Стоимость для информации
    tax_id: number | null               // ID налога для ставки
    currency_id: string | null          // ID валюты
    is_fixed_price: boolean             // Стоимость является фиксированной
    is_min_value_not_limited: boolean   // Минимальное значение не ограничено
    is_max_value_not_limited: boolean   // Максимальное значение не ограничено
    is_tax_included_in_price: boolean   // Налог включен в стоимость
    group_num: number                   // Номер группы, в которой должна отображаться ставка
    minimal_payment_price: number       // Минимально оплачиваемая стоимость
};

// Настройки по умолчанию для условий ценового предложения плеча
export class DefaultShoulderOfferConditionSettings implements Settings<ShoulderOfferCondition> {
    import_id: FieldSettings<ShoulderOfferCondition, "import_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "import_id",
        type: "uuid"
    };
    id: FieldSettings<ShoulderOfferCondition, "id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "id",
        type: "none"
    };
    min_value: FieldSettings<ShoulderOfferCondition, "min_value", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "min_value",
        type: "none"
    };
    is_min_value_not_limited: FieldSettings<ShoulderOfferCondition, "is_min_value_not_limited", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "is_min_value_not_limited",
        type: "none"
    };
    max_value: FieldSettings<ShoulderOfferCondition, "max_value", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "max_value",
        type: "none"
    };
    is_max_value_not_limited: FieldSettings<ShoulderOfferCondition, "is_max_value_not_limited", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "is_max_value_not_limited",
        type: "none"
    };
    unit_id: FieldSettings<ShoulderOfferCondition, "unit_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "unit_id",
        type: "none",
    };
    price: FieldSettings<ShoulderOfferCondition, "price", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "price",
        type: "none"
    };
    currency_id: FieldSettings<ShoulderOfferCondition, "currency_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "currency_id",
        type: "none"
    };
    is_fixed_price: FieldSettings<ShoulderOfferCondition, "is_fixed_price", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "is_fixed_price",
        type: "none"
    };
    tax_id: FieldSettings<ShoulderOfferCondition, "tax_id", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "tax_id",
        type: "none"
    };
    is_tax_included_in_price: FieldSettings<ShoulderOfferCondition, "is_tax_included_in_price", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "is_tax_included_in_price",
        type: "none"
    };
    minimal_payment_price: FieldSettings<ShoulderOfferCondition, "minimal_payment_price", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "minimal_payment_price",
        type: "none"
    };
    information_price: FieldSettings<ShoulderOfferCondition, "information_price", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "information_price",
        type: "none"
    };
    group_num: FieldSettings<ShoulderOfferCondition, "group_num", ImportProcessingConfigurationType> = {
        configuration: undefined,
        field: "group_num",
        type: "none"
    };
}

// Конфигурация для условий ценовых предложений
export class ShoulderOfferConditionConfiguration implements FieldConfigurationCollection<ShoulderOfferCondition> {
    import_id: FieldConfiguration<ShoulderOfferCondition, "import_id"> = {
        field: "import_id",
        fieldIsNullable: false,
        fieldTitle: "Временный ID",
        fieldValueType: "string",
        isConfigurable: true,
        defaultValue: async () => v4(),
    };
    id: FieldConfiguration<ShoulderOfferCondition, "id"> = {
        field: "id",
        fieldIsNullable: true,
        fieldTitle: "ID",
        fieldValueType: "string",
        isConfigurable: true
    };
    min_value: FieldConfiguration<ShoulderOfferCondition, "min_value"> = {
        field: "min_value",
        fieldIsNullable: false,
        fieldTitle: "От",
        fieldValueType: "number",
        isConfigurable: true,
    };
    is_min_value_not_limited: FieldConfiguration<ShoulderOfferCondition, "is_min_value_not_limited"> = {
        field: "is_min_value_not_limited",
        fieldIsNullable: false,
        fieldTitle: "'От' не ограничено",
        fieldValueType: "boolean",
        isConfigurable: true,
        defaultValue: async () => {
            return false;
        },
    };
    max_value: FieldConfiguration<ShoulderOfferCondition, "max_value"> = {
        field: "max_value",
        fieldIsNullable: false,
        fieldTitle: "До",
        fieldValueType: "number",
        isConfigurable: true
    };
    is_max_value_not_limited: FieldConfiguration<ShoulderOfferCondition, "is_max_value_not_limited"> = {
        field: "is_max_value_not_limited",
        fieldIsNullable: false,
        fieldTitle: "'До' не ограничено",
        fieldValueType: "boolean",
        isConfigurable: true,
        defaultValue: async () => {
            return false;
        },
    };
    unit_id: FieldConfiguration<ShoulderOfferCondition, "unit_id"> = {
        field: "unit_id",
        fieldIsNullable: false,
        fieldTitle: "Единица измерения",
        fieldValueType: "string",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "TransportUnit",
            relatedEntitySchema: "transport_unit",
            fieldsToLoad: ["unit_symbol", "id", "default_name"],
            valueLabelGenerator: option => `${option.default_name} (${option.unit_symbol})`,
            primaryKeyGetter: option => option.id,
        },
    };
    price: FieldConfiguration<ShoulderOfferCondition, "price"> = {
        field: "price",
        fieldIsNullable: false,
        fieldTitle: "Стоимость",
        fieldValueType: "number",
        isConfigurable: true,
    };
    currency_id: FieldConfiguration<ShoulderOfferCondition, "currency_id"> = {
        isConfigurable: true,
        field: "currency_id",
        fieldIsNullable: false,
        fieldTitle: "Валюта",
        fieldValueType: "string",
        relation: {
            relatedEntityCode: "Currency",
            relatedEntitySchema: "currency",
            fieldsToLoad: ["code", "id"],
            valueLabelGenerator: option => option.code,
            primaryKeyGetter: option => option.id,
        },
        defaultValue: async () => {
            return await currencyDefaultGetter().getDefaultForTransport()
        },
    };
    is_fixed_price: FieldConfiguration<ShoulderOfferCondition, "is_fixed_price"> = {
        field: "is_fixed_price",
        fieldIsNullable: false,
        fieldTitle: "Фиксированная стоимость",
        fieldValueType: "boolean",
        isConfigurable: true
    };
    tax_id: FieldConfiguration<ShoulderOfferCondition, "tax_id"> = {
        field: "tax_id",
        fieldIsNullable: true,
        fieldTitle: "Налог",
        fieldValueType: "number",
        isConfigurable: true,
        relation: {
            relatedEntityCode: "Tax",
            relatedEntitySchema: "tax",
            fieldsToLoad: ["default_name", "id"],
            valueLabelGenerator: option => option.default_name,
            primaryKeyGetter: option => option.id,
        },
        defaultValue: async () => {
            return await taxDefaultGetter().getDefaultTax()
        },
    };
    is_tax_included_in_price: FieldConfiguration<ShoulderOfferCondition, "is_tax_included_in_price"> = {
        field: "is_tax_included_in_price",
        fieldIsNullable: false,
        fieldTitle: "Налог включен в стоимость",
        fieldValueType: "boolean",
        isConfigurable: true
    };
    minimal_payment_price: FieldConfiguration<ShoulderOfferCondition, "minimal_payment_price"> = {
        field: "minimal_payment_price",
        fieldIsNullable: false,
        fieldTitle: "Минимальная стоимость",
        fieldValueType: "number",
        isConfigurable: true
    };
    information_price: FieldConfiguration<ShoulderOfferCondition, "information_price"> = {
        field: "information_price",
        fieldIsNullable: false,
        fieldTitle: "Справочная стоимость",
        fieldValueType: "number",
        isConfigurable: true
    };
    group_num: FieldConfiguration<ShoulderOfferCondition, "group_num"> = {
        isConfigurable: false,
        field: "group_num",
        fieldIsNullable: false,
        fieldTitle: "Номер группы",
        fieldValueType: "number",
    };
}
