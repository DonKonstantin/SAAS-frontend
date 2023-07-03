import {SchemaField} from "../../settings/schema";

/**
 * Конвертер значений для загрузчика данных GraphQL
 */
export interface GraphQlSchemaValueConverterInterface {
    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     *
     * @param field
     * @param value
     */
    convertValueFromGraphQL(field: SchemaField, value: any): any

    /**
     * Конвертация системного значения в формат GraphQL
     * @param field
     * @param value
     */
    convertValueToGraphQL(field: SchemaField, value: any): string
}