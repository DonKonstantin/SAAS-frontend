// Тип, описывающий метод парсинга для поля конфигурации
export type ConfigurationParsingMethod = "column" | "regular" | "reference" | "uuid" | "none" | "compare" | "compare-with-relation"

// Тип, описывающий структуру конфигурации для конкретного типа обработки
export type Configuration<T extends ConfigurationParsingMethod, Config> = {
    type: T
    configuration: Config
}

// Тип, описывающий сообщение для локализации
export type LocalizedMessageToImport = {
    lang_id: string
    message: string
};

// Сущность локации, готовой для импорта
export type LocationToImport = {
    default_name: string
    id: string
    import_id: string
    is_country: boolean
    is_user_searchable: boolean
    localized_names: LocalizedMessageToImport[]
    parent_id: string
    parent_import_id: string
    symbol_code: string
    populated_area: boolean
    population: number
    latitude: number
    longitude: number
    search_tags: string[]
}

// Шаг обработки парсинга
export type ProcessingStep = {
    stepName: string
    stepProcessingStatus: number
    stepProcessingMaxValue: number
}

// Собранные воедино статусы обработки локаций
export class StatusTypes {
    processing: ProcessingStep;
    complete: {result: LocationToImport[], relations: {id: string, default_name: string}[]};
}

// Текущий статус обработки данных локаций
export type ProcessingStatus<T extends keyof StatusTypes> = {
    type: T
    payload: StatusTypes[T]
}