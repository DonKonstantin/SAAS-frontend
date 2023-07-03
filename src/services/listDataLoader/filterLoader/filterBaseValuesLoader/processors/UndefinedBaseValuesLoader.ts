import {FilterBaseValuesLoaderProcessor} from "./interfaces";
import {RegisteredFilterFieldBaseComponentValues} from "../../types";

/**
 * Пропуск загрузки для полей, для которых загрузка не требуется
 */
export class UndefinedBaseValuesLoader<
    G extends "Like" | "Checkbox" | "Switch" | "EqualsFloat" | "EqualsInt" | "EqualsString" | "EnumSelector"
> implements FilterBaseValuesLoaderProcessor<G> {
    /**
     * Набор базовых операций агрегации для получения базовых данных
     */
    getOperationsForField(): string[] {
        return [];
    }

    /**
     * Парсинг значений базового запроса
     */
    parseBaseQueryResult(): RegisteredFilterFieldBaseComponentValues[G] {
        return undefined;
    }
}