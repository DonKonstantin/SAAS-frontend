import {FieldType} from "../../settings/schema";

/**
 * Конвертер значений из формата GraphQL в системный и наоборот
 */
export interface SchemaValueConverterInterface {
    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     * @param fieldType
     * @param value
     */
    convertValueFromGraphQL(fieldType: FieldType, value: any): any

    /**
     * Конвертация системного значения в формат GraphQL
     * @param fieldType
     * @param value
     */
    convertValueToGraphQL(fieldType: FieldType, value: any): string
}