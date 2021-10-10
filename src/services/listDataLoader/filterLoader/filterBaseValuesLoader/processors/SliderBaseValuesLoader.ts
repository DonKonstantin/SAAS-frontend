import {FilterBaseValuesLoaderProcessor} from "./interfaces";
import {RegisteredFilterFieldBaseComponentValues} from "../../types";
import {FieldType, Schemas} from "../../../../../settings/schema";
import {SliderBaseValues} from "../../fieldBaseData/SliderBaseValues";
import {SchemaValueConverterInterface} from "../../../../schemaValueConverter/interfaces";

/**
 * Загрузка базовых значений для слайдеров
 */
export class SliderBaseValuesLoader<G extends "DateTimeSlider" | "FloatSlider" | "IntegerSlider"> implements FilterBaseValuesLoaderProcessor<G> {
    private readonly valueConverter: SchemaValueConverterInterface

    /**
     * Конструктор процессора
     * @param valueConverter
     */
    constructor(valueConverter: SchemaValueConverterInterface) {
        this.valueConverter = valueConverter;
    }

    /**
     * Набор базовых операций агрегации для получения базовых данных
     */
    getOperationsForField(): string[] {
        return [`min`, `max`];
    }

    /**
     * Парсинг значений базового запроса
     * @param _
     * @param fieldCode
     * @param filterFieldType
     * @param data
     */
    parseBaseQueryResult<T extends keyof Schemas>(
        _: T,
        fieldCode: keyof Schemas[T]["fields"],
        filterFieldType: G,
        data: any
    ): RegisteredFilterFieldBaseComponentValues[G] {
        let result = new SliderBaseValues<any>()
        const baseMin = data['min'][fieldCode] ? data['min'][fieldCode] : null
        const baseMax = data['max'][fieldCode] ? data['max'][fieldCode] : null

        const fieldType: FieldType = filterFieldType === "DateTimeSlider" ? "DateTime!" : "Float!"

        result.min = this.valueConverter.convertValueFromGraphQL(fieldType, baseMin)
        result.max = this.valueConverter.convertValueFromGraphQL(fieldType, baseMax)

        result.currentMin = result.min
        result.currentMax = result.max

        return result;
    }
}