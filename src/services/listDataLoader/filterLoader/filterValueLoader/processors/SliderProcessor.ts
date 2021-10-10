import {
    RegisteredFilterFieldBaseComponentValues,
    RegisteredFilterFieldComponentValues, RegisteredFilterFieldConfiguration
} from "../../types";
import {FilterValueLoaderProcessor} from "./interfaces";
import {Schemas} from "../../../../../settings/schema";
import {SliderComponentValues} from "../../fieldValues/Slider";

/**
 * Процессор обработки значений слайдера
 */
export class SliderProcessor<F extends "DateTimeSlider" | "FloatSlider" | "IntegerSlider"> implements FilterValueLoaderProcessor<F> {
    /**
     * Парсинг базовых значений
     * @param _
     * @param data
     */
    loadValue<T extends keyof Schemas, K extends keyof Schemas[T]['fields']>(
        _: RegisteredFilterFieldConfiguration<T, K>[F],
        data: RegisteredFilterFieldBaseComponentValues[F]
    ): RegisteredFilterFieldComponentValues[F] {
        let result = new SliderComponentValues<any>()
        result.min = data.min
        result.max = data.max
        result.currentMax = data.currentMax
        result.currentMin = data.currentMin

        return result;
    }
}