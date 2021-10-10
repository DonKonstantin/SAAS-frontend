import {AvailableFilterField, RegisteredFilterFieldBaseComponentValues} from "../../types";
import {Schemas} from "../../../../../settings/schema";

/**
 * Процессор загрузки базовых данных для поля фильтрации
 */
export interface FilterBaseValuesLoaderProcessor<F extends AvailableFilterField> {
    /**
     * Набор базовых операций агрегации для получения базовых данных
     */
    getOperationsForField(): string[]

    /**
     * Парсинг значений базового запроса
     * @param schema
     * @param fieldCode
     * @param filterFieldType
     * @param data
     */
    parseBaseQueryResult<T extends keyof Schemas>(
        schema: T,
        fieldCode: keyof Schemas[T]['fields'],
        filterFieldType: F,
        data: any
    ): RegisteredFilterFieldBaseComponentValues[F]
}