import {FilterValueLoaderProcessor} from "./interfaces";
import {RegisteredFilterFieldComponentValues} from "../../types";
import {SimpleComponentValue} from "../../fieldValues/SimpleComponentValue";

/**
 * Процессор простых типов значений
 */
export class SimpleValueProcessor<F extends "Like" | "Checkbox" | "Switch" | "EqualsFloat" | "EqualsInt" | "EqualsString" | "EnumSelector"> implements FilterValueLoaderProcessor<F> {
    /**
     * Парсинг базовых значений
     */
    loadValue(): RegisteredFilterFieldComponentValues[F] {
        let result = new SimpleComponentValue<any>();
        result.value = null;

        return result as RegisteredFilterFieldComponentValues[F];
    }
}