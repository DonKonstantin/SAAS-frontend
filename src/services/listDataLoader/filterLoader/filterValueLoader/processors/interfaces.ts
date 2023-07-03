import {
    AvailableFilterField,
    RegisteredFilterFieldBaseComponentValues,
    RegisteredFilterFieldComponentValues, RegisteredFilterFieldConfiguration
} from "../../types";
import {Schemas} from "../../../../../settings/schema";

/**
 * Процессор загрузки базовых данных для поля фильтрации
 */
export interface FilterValueLoaderProcessor<F extends AvailableFilterField> {
    /**
     * Парсинг базовых значений
     * @param fieldConfig
     * @param data
     */
    loadValue<T extends keyof Schemas, K extends keyof Schemas[T]['fields']>(
        fieldConfig: RegisteredFilterFieldConfiguration<T, K>[F],
        data: RegisteredFilterFieldBaseComponentValues[F]
    ): RegisteredFilterFieldComponentValues[F]
}