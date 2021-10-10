import {FilterGeneratorProcessor, FilterGeneratorProcessorParams} from "./interfaces";
import {SchemaField, Schemas} from "../../../../../../settings/schema";
import {SchemaValueConverterInterface} from "../../../../../schemaValueConverter/interfaces";
import {schemaValueConverter} from "../../../../../schemaValueConverter";

/**
 * Процессор генерации подзапросов фильтрации для слайдеров дат
 */
export class DateTimeSliderProcessor implements FilterGeneratorProcessor<"DateTimeSlider"> {
    private readonly valueConverter: SchemaValueConverterInterface;

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
        params: FilterGeneratorProcessorParams<"DateTimeSlider", K, F>
    ): string {
        const currentMin = new Date(params.currentValue.value.currentMin);
        const currentMax = new Date(params.currentValue.value.currentMax);
        const min = new Date(params.currentValue.value.min);
        const max = new Date(params.currentValue.value.max);

        // @ts-ignore
        const field: SchemaField = (new Schemas)[params.currentValue.configuration.schema].fields[params.currentValue.configuration.field];

        let query: string = "";
        if (currentMin.getTime() !== min.getTime()) {
            query = `${params.currentValue.configuration.field}: {_more_or_equals: ${this.valueConverter.convertValueToGraphQL(field.type, currentMin)}}`
        }

        if (currentMax.getTime() !== max.getTime()) {
            query = `${params.currentValue.configuration.field}: {_less_or_equals: ${this.valueConverter.convertValueToGraphQL(field.type, currentMax)}}`
        }

        if (currentMax.getTime() !== max.getTime()
            && currentMin.getTime() !== min.getTime()
        ) {
            query = `_and: [
                {${params.currentValue.configuration.field}: {_less_or_equals: ${this.valueConverter.convertValueToGraphQL(field.type, currentMax)}}},
                {${params.currentValue.configuration.field}: {_more_or_equals: ${this.valueConverter.convertValueToGraphQL(field.type, currentMin)}}}
            ]`
        }

        if (0 === query.length) {
            return ""
        }

        return query;
    }
}