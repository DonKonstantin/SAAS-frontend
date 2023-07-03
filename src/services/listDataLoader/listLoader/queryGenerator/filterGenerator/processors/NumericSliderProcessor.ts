import {FilterGeneratorProcessor, FilterGeneratorProcessorParams} from "./interfaces";
import {SchemaField, Schemas} from "../../../../../../settings/schema";
import {SchemaValueConverterInterface} from "../../../../../schemaValueConverter/interfaces";
import {schemaValueConverter} from "../../../../../schemaValueConverter";

/**
 * Процессор генерации подзапросов фильтрации для числовых слайдеров
 */
export class NumericSliderProcessor implements FilterGeneratorProcessor<"FloatSlider" | "IntegerSlider"> {
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
        params: FilterGeneratorProcessorParams<"FloatSlider" | "IntegerSlider", K, F>
    ): string {
        // @ts-ignore
        const field: SchemaField = (new Schemas)[params.currentValue.configuration.schema].fields[params.currentValue.configuration.field]

        let query: string = ""
        if (params.currentValue.value.currentMin !== params.currentValue.value.min) {
            query = `${params.currentValue.configuration.field}: {_more_or_equals: ${this.valueConverter.convertValueToGraphQL(field.type, params.currentValue.value.currentMin)}}`
        }

        if (params.currentValue.value.currentMax !== params.currentValue.value.max) {
            query = `${params.currentValue.configuration.field}: {_less_or_equals: ${this.valueConverter.convertValueToGraphQL(field.type, params.currentValue.value.currentMax)}}`
        }

        if (params.currentValue.value.currentMax !== params.currentValue.value.max
            && params.currentValue.value.currentMin !== params.currentValue.value.min
        ) {
            query = `_and: [
                {${params.currentValue.configuration.field}: {_less_or_equals: ${this.valueConverter.convertValueToGraphQL(field.type, params.currentValue.value.currentMax)}}},
                {${params.currentValue.configuration.field}: {_more_or_equals: ${this.valueConverter.convertValueToGraphQL(field.type, params.currentValue.value.currentMin)}}}
            ]`
        }

        if (0 === query.length) {
            return ""
        }

        return query;
    }
}