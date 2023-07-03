import {FieldType} from "../../../settings/schema";

/**
 * Интерфейс процессора конвертации значений
 */
export interface SchemaValueConverterProcessor {
    /**
     * Проверка доступности процессора
     * @param fieldType
     */
    isAvailable(fieldType: FieldType): boolean

    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     * @param value
     */
    convertValueFromGraphQL(value: any): any

    /**
     * Конвертация системного значения в формат GraphQL
     * @param value
     */
    convertValueToGraphQL(value: any): string
}