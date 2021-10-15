import {FilterValueLoaderProcessor} from "./interfaces";
import {
    RegisteredFilterFieldBaseComponentValues,
    RegisteredFilterFieldComponentValues,
    RegisteredFilterFieldConfiguration
} from "../../types";
import {Schemas} from "../../../../../settings/schema";
import {VariantsComponentValue} from "../../fieldValues/VariantsComponentValue";

/**
 * Процессор полей вариантов выбора
 */
export class VariantsProcessor<F extends "RelationVariantsSelector" | "VariantsSelectorFloat" | "VariantsSelectorInt" | "VariantsSelectorString" | "RelationAutocompleteSelector"> implements FilterValueLoaderProcessor<F> {
    /**
     * Парсинг базовых значений
     * @param _
     * @param data
     */
    loadValue<T extends keyof Schemas, K extends keyof Schemas[T]['fields']>(
        _: RegisteredFilterFieldConfiguration<T, K>[F],
        data: RegisteredFilterFieldBaseComponentValues[F]
    ): RegisteredFilterFieldComponentValues[F] {
        let result = new VariantsComponentValue<any[]>();
        result.value = [];
        result.variants = data?.variants || [];

        return result;
    }
}