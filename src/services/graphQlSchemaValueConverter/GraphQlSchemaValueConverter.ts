import {GraphQlSchemaValueConverterInterface} from "./interfaces";
import {SchemaField} from "../../settings/schema";
import {SchemaValueConverterInterface} from "../schemaValueConverter/interfaces";

/**
 * Конвертер значений для загрузчика данных GraphQL
 */
export class GraphQlSchemaValueConverter implements GraphQlSchemaValueConverterInterface {
    private readonly baseConverter: SchemaValueConverterInterface;

    /**
     * Конструктор сервиса
     * @param baseConverter
     */
    constructor(baseConverter: SchemaValueConverterInterface) {
        this.baseConverter = baseConverter;
    }

    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     *
     * @param field
     * @param value
     */
    convertValueFromGraphQL(field: SchemaField, value: any): any {
        if (!field.isArray) {
            return this.baseConverter.convertValueFromGraphQL(field.type, value)
        }

        let val: any[];
        if (!Array.isArray(value)) {
            val = [value]
        } else {
            val = [...value]
        }

        return val.map(value => this.baseConverter.convertValueFromGraphQL(field.type, value))
    }

    /**
     * Конвертация системного значения в формат GraphQL
     * @param field
     * @param value
     */
    convertValueToGraphQL(field: SchemaField, value: any): string {
        if (!field.isArray) {
            return this.baseConverter.convertValueToGraphQL(field.type, value)
        }

        let val: string[];
        if (!Array.isArray(value)) {
            val = [value]
        } else {
            val = [...value]
        }

        return `[${val.map(value => this.baseConverter.convertValueToGraphQL(field.type, value)).join(", ")}]`
    }
}