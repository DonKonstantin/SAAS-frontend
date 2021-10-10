import {Schemas} from "../../../../settings/schema";
import {AvailableFilterField, DeclaredFilterFieldPreloadedData, FilterFieldsConfiguration} from "../types";
import {LoadedFiltersBaseData} from "../filterBaseValuesLoader/interfaces";

// Результаты загрузки базовых данных полей фильтрации
export type LoadedAdditionData<T extends keyof Schemas> = { [F in keyof Schemas[T]['fields']]?: DeclaredFilterFieldPreloadedData[AvailableFilterField] }

// Параметры загрузки дополнительных значений для полей фильтрации
export interface FilterPreloaderParameters<T extends keyof Schemas> {
    configuration: FilterFieldsConfiguration<T>
    baseData: LoadedFiltersBaseData<T>
}

/**
 * Загрузчик дополнительных данных для фильтра
 */
export interface FilterPreloaderInterface {
    /**
     * Загрузка базовых данных
     * @param params
     */
    Load<T extends keyof Schemas>(params: FilterPreloaderParameters<T>): Promise<LoadedAdditionData<T>>
}