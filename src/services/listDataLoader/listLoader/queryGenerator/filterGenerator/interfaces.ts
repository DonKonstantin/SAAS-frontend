import {Schemas} from "../../../../../settings/schema";
import {ListLoadingParameters} from "../../interfaces";

/**
 * Генератор подзапроса фильтрации
 */
export interface FilterGeneratorInterface {
    /**
     * Генерация подстроки фильтрации запроса листинга
     * @param params
     */
    GenerateFilter<T extends keyof Schemas>(params: ListLoadingParameters<T>): string
}