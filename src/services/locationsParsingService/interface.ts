import {Column} from "../excelGridColumnsGenerator/interface";
import {Configuration, ConfigurationParsingMethod, LocationToImport, ProcessingStatus, StatusTypes} from "./types";
import {ConvertationResponse} from "../fileConvertationService/interfaces";
import {Subject, Subscribable} from "rxjs";

// Тип, описывающий конфигурацию для типа "column"
export type ColumnConfiguration = {
    column: Column
}

// Тип, описывающий конфигурацию для тип regular
export type RegularValueConfiguration = {
    value: string | boolean | number
    type: "string" | "boolean" | "number"
}

// Тип, описывающий конфигурацию для reference
export type ReferenceConfiguration = {
    referenceField: keyof LocationParsingConfiguration
    column: Column
}

// Тип, описывающий конфигурацию для объединения полей
export type ColumnsConfiguration = {
    columnFirst: Column
    columnSecond: Column
}

// Тип, описывающий конфигурацию для объединения полей с поиском отношения
export type ReferenceWithCompareConfiguration = ColumnsConfiguration & {
    referenceField: keyof LocationParsingConfiguration
}

// Регистрация типов конфигурации для парсера
export class AvailableConfigurations {
    column: Configuration<"column", ColumnConfiguration>;
    regular: Configuration<"regular", RegularValueConfiguration>;
    reference: Configuration<"reference", ReferenceConfiguration>;
    uuid: Configuration<"uuid", undefined>;
    none: Configuration<"none", undefined>;
    compare: Configuration<"compare", ColumnsConfiguration>;
    "compare-with-relation": Configuration<"compare-with-relation", ReferenceWithCompareConfiguration>;
}

// Тип, описывающий конфигурацию для конкретного типа парсинга
export type Config<T extends ConfigurationParsingMethod> = AvailableConfigurations[T]
export type LocationParsingConfiguration = {
    id: Config<ConfigurationParsingMethod>
    defaultName: Config<ConfigurationParsingMethod>
    symbolCode: Config<ConfigurationParsingMethod>
    parent: Config<ConfigurationParsingMethod>
    isCountry: Config<ConfigurationParsingMethod>
    isUserSearchable: Config<ConfigurationParsingMethod>
    isPopulationArea: Config<ConfigurationParsingMethod>
    latitude: Config<ConfigurationParsingMethod>
    longitude: Config<ConfigurationParsingMethod>
    population: Config<ConfigurationParsingMethod>
}

/**
 * Сервис обработки файлов импорта для локаций
 */
export interface LocationsParsingServiceInterface {
    /**
     * Парсинг переданных файлов, для текущих локаций
     * @param files
     * @param config
     */
    ParseLocations(
        files: ConvertationResponse,
        config: LocationParsingConfiguration
    ): {
        subscription: Subscribable<ProcessingStatus<keyof StatusTypes>>,
        startProcessingCallback: {(): void}
    };
}

/**
 * Шаг обработки файлов импорта для локаций
 */
export interface LocationsParsingServiceStepInterface {
    /**
     * Обработка данных текущим шагом
     * @param files
     * @param config
     * @param previousResult
     * @param previousRelations
     * @param subject
     */
    Process(
        files: ConvertationResponse,
        config: LocationParsingConfiguration,
        previousResult: LocationToImport[],
        previousRelations: {id: string, default_name: string}[],
        subject: Subject<ProcessingStatus<keyof StatusTypes>>
    ): Promise<{result: LocationToImport[], relations: {id: string, default_name: string}[]}>
}

/**
 * Процессор обработки конвертации поля конфигурации для локаций
 */
export interface ConvertFilesToBaseLocationToImportProcessorInterface {
    /**
     * Проверка доступности процессора
     * @param config
     */
    isAvailable(config: Config<ConfigurationParsingMethod>): boolean

    /**
     * Конвертация значения из переданной строки по переданной конфигурации
     * @param row
     * @param config
     */
    convert(row: string[], config: Config<ConfigurationParsingMethod>): any
}

export type LocationConfigFieldToLocationToImport = {[T in keyof LocationParsingConfiguration]: keyof LocationToImport}
export class FieldsRelations implements LocationConfigFieldToLocationToImport {
    defaultName: keyof LocationToImport = "default_name";
    id: keyof LocationToImport = "import_id";
    isCountry: keyof LocationToImport = "is_country";
    isUserSearchable: keyof LocationToImport = "is_user_searchable";
    parent: keyof LocationToImport = "parent_import_id";
    symbolCode: keyof LocationToImport = "symbol_code";
    isPopulationArea: keyof LocationToImport = "populated_area";
    latitude: keyof LocationToImport = "latitude";
    longitude: keyof LocationToImport = "longitude";
    population: keyof LocationToImport = "population";
}

export class RealFieldsRelations implements LocationConfigFieldToLocationToImport {
    defaultName: keyof LocationToImport = "default_name";
    id: keyof LocationToImport = "id";
    isCountry: keyof LocationToImport = "is_country";
    isUserSearchable: keyof LocationToImport = "is_user_searchable";
    parent: keyof LocationToImport = "parent_id";
    symbolCode: keyof LocationToImport = "symbol_code";
    isPopulationArea: keyof LocationToImport = "populated_area";
    latitude: keyof LocationToImport = "latitude";
    longitude: keyof LocationToImport = "longitude";
    population: keyof LocationToImport = "population";
}

export type SourceEntityToLocationToImport = {[T in keyof LocationParsingConfiguration]?: keyof LocationToImport}
export class SourceRelations implements SourceEntityToLocationToImport {
    id: keyof LocationToImport = "id";
    parent: keyof LocationToImport = "parent_id";
}