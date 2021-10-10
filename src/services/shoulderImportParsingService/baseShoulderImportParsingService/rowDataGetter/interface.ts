import {ImportParsingConfigurationTypes, ImportParsingTypes} from "../../../shoulderImportTaskService/baseTypes";

/**
 * Сервис получения строк для парсинга значений
 */
export interface RowDataGetterInterface {
    /**
     * Получение строк для обработки данных по конфигурации парсинга
     *
     * @param data
     * @param parentRow
     * @param parsingType
     * @param parsingConfig
     * @param parentValues
     */
    getRows<ParsingType extends ImportParsingTypes>(
        data: { [K in string]: string[][] },
        parentRow: string[],
        parsingType: ParsingType,
        parsingConfig: ImportParsingConfigurationTypes[ParsingType],
        parentValues: object,
    ): string[][]
}

/**
 * Процессор сервиса получения строк для парсинга значений
 */
export interface RowDataGetterProcessorInterface {
    /**
     * Проверка доступности процессора
     *
     * @param data
     * @param parentRow
     * @param parsingType
     * @param parsingConfig
     * @param parentValues
     */
    isAvailable<ParsingType extends ImportParsingTypes>(
        data: { [K in string]: string[][] },
        parentRow: string[],
        parsingType: ParsingType,
        parsingConfig: ImportParsingConfigurationTypes[ParsingType],
        parentValues: object,
    ): boolean

    /**
     * Получение строк для обработки данных по конфигурации парсинга
     *
     * @param data
     * @param parentRow
     * @param parsingType
     * @param parsingConfig
     * @param parentValues
     */
    getRows<ParsingType extends ImportParsingTypes>(
        data: { [K in string]: string[][] },
        parentRow: string[],
        parsingType: ParsingType,
        parsingConfig: ImportParsingConfigurationTypes[ParsingType],
        parentValues: object,
    ): string[][]
}