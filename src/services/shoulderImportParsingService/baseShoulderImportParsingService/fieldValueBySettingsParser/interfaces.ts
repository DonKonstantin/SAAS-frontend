import {
    FieldConfigurationCollection,
    FieldSettings,
    ImportProcessingConfigurationType,
    Settings
} from "../../../shoulderImportTaskService/baseTypes";

// Результат парсинга полей
export type Values<T> = {[K in keyof T]: {
    value: any
    error?: string
}}

/**
 * Сервис парсинга переданных данных по конфигурации полей
 */
export interface FieldValueBySettingsParserInterface {
    /**
     * Парсинг переданных данных по конфигурации полей
     * @param data
     * @param rowData
     * @param settings
     * @param fieldsConfiguration
     */
    parse<Entity extends object>(
        data: { [K in string]: string[][] },
        rowData: string[],
        settings: Settings<Entity>,
        fieldsConfiguration: FieldConfigurationCollection<Entity>
    ): Promise<Values<Entity>>
}

/**
 * Парсинг одиночного поля по переданной конфигурации
 */
export interface FieldSingleValueParserInterface {
    /**
     * Парсинг переданных данных по конфигурации полей
     * @param data
     * @param rowData
     * @param settings
     * @param fieldsConfiguration
     */
    parse<Entity extends object, field extends keyof Entity>(
        data: { [K in string]: string[][] },
        rowData: string[],
        settings: FieldSettings<Entity, field, ImportProcessingConfigurationType>,
        fieldsConfiguration: FieldConfigurationCollection<Entity>
    ): Promise<any>
}

/**
 * Процессор парсинга одиночного поля по переданной конфигурации
 */
export interface FieldSingleValueParserProcessorInterface {
    /**
     * Проверка доступности процессора
     * @param data
     * @param rowData
     * @param settings
     * @param fieldsConfiguration
     */
    isAvailable<Entity extends object, field extends keyof Entity>(
        data: { [K in string]: string[][] },
        rowData: string[],
        settings: FieldSettings<Entity, field, ImportProcessingConfigurationType>,
        fieldsConfiguration: FieldConfigurationCollection<Entity>
    ): boolean

    /**
     * Парсинг переданных данных по конфигурации полей
     * @param data
     * @param rowData
     * @param settings
     * @param fieldsConfiguration
     */
    parse<Entity extends object, field extends keyof Entity>(
        data: { [K in string]: string[][] },
        rowData: string[],
        settings: FieldSettings<Entity, field, ImportProcessingConfigurationType>,
        fieldsConfiguration: FieldConfigurationCollection<Entity>
    ): Promise<any>
}