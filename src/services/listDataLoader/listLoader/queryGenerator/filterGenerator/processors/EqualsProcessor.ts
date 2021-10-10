import {FilterGeneratorProcessor, FilterGeneratorProcessorParams} from "./interfaces";
import {SchemaField, Schemas} from "../../../../../../settings/schema";
import {SchemaValueConverterInterface} from "../../../../../schemaValueConverter/interfaces";
import {schemaValueConverter} from "../../../../../schemaValueConverter";

/**
 * Процессор генерации подзапросов фильтрации для простого сравнения
 */
export class EqualsProcessor implements FilterGeneratorProcessor<"EqualsFloat" | "EqualsInt" | "EqualsString" | "EnumSelector"> {
    private readonly valueConverter: SchemaValueConverterInterface

    /**
     * Конструктор процессора
     */
    constructor() {
        this.valueConverter = schemaValueConverter()
    }

    /**
     * Генерация подзапроса для одного поля
     * @param params
     */
    GenerateFilter<K extends keyof Schemas, F extends keyof Schemas[K]["fields"]>(
        params: FilterGeneratorProcessorParams<"EqualsFloat" | "EqualsInt" | "EqualsString" | "EnumSelector", K, F>
    ): string {
        if (params.currentValue.value.value === null) return ""

        // @ts-ignore
        const field: SchemaField = (new Schemas)[params.currentValue.configuration.schema].fields[params.currentValue.configuration.field]
        const value = this.valueConverter.convertValueToGraphQL(field.type, params.currentValue.value.value)

        return `${params.currentValue.configuration.field}: {_equals: ${value}}`;
    }
}