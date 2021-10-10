import {SchemaValueConverterInterface} from "./interfaces";
import {FieldType} from "../../settings/schema";
import {SchemaValueConverterProcessor} from "./converters/interfaces";

/**
 * Конвертер значений из формата GraphQL в системный и наоборот
 */
export class SchemaValueConverter implements SchemaValueConverterInterface {
    private readonly processors: SchemaValueConverterProcessor[];

    /**
     * Конструктор сервиса
     * @param processors
     */
    constructor(processors: SchemaValueConverterProcessor[]) {
        this.processors = processors;
    }

    /**
     * Конвертация значения, полученного из GraphQL схемы в валидный эквивалент системного значения
     * @param fieldType
     * @param value
     */
    convertValueFromGraphQL(fieldType: FieldType, value: any): any {
        const processor = this.processors.find(proc => proc.isAvailable(fieldType));
        if (undefined !== processor) {
            return processor.convertValueFromGraphQL(value)
        }

        return undefined
    }

    /**
     * Конвертация системного значения в формат GraphQL
     * @param fieldType
     * @param value
     */
    convertValueToGraphQL(fieldType: FieldType, value: any): string {
        const processor = this.processors.find(proc => proc.isAvailable(fieldType));
        if (undefined !== processor) {
            return processor.convertValueToGraphQL(value)
        }

        return ''
    }
}