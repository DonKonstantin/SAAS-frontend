import {Schemas} from "../../../../settings/schema";
import {FilterFieldComponents, FilterFieldsConfiguration,} from "../types";
import {LoadedFiltersBaseData} from "../filterBaseValuesLoader/interfaces";
import {LoadedFilterData} from "../interfaces";

// Результаты загрузки значений для полей фильтрации
export type LoadedFilterValues<T extends keyof Schemas> = { [F in keyof Schemas[T]['fields']]?: LoadedFilterData<keyof FilterFieldComponents, T, F> }

// Параметры загрузки значений для полей фильтрации
export interface FilterValueLoaderParameters<T extends keyof Schemas> {
    configuration: FilterFieldsConfiguration<T>
    baseData: LoadedFiltersBaseData<T>
}

/**
 * Загрузчик базовых данных для переданных полей
 */
export interface FilterValueLoaderInterface {
    /**
     * Загрузка базовых данных
     * @param params
     */
    Load<T extends keyof Schemas>(params: FilterValueLoaderParameters<T>): LoadedFilterValues<T>
}