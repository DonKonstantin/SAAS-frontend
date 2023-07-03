import {Schemas} from "../../../../settings/schema";
import {
    AvailableFilterField,
    FilterFieldsConfiguration,
    RegisteredFilterFieldBaseComponentValues
} from "../types";

// Результаты загрузки базовых данных полей фильтрации
export type LoadedFiltersBaseData<T extends keyof Schemas> = {[F in keyof Schemas[T]['fields']]?: RegisteredFilterFieldBaseComponentValues[AvailableFilterField]}

/**
 * Загрузчик базовых данных для переданных полей
 */
export interface FilterBaseValuesLoaderInterface {
    /**
     * Загрузка базовых данных
     * @param configuration
     * @param additionFilter
     */
    Load<T extends keyof Schemas>(
        configuration: FilterFieldsConfiguration<T>,
        additionFilter: {[T: string]: string},
    ): Promise<LoadedFiltersBaseData<T>>
}