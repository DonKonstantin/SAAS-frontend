import {FilterFieldComponents} from "../../../../filterLoader/types";
import {LoadedFilterData} from "../../../../filterLoader/interfaces";
import {Schemas} from "../../../../../../settings/schema";

/**
 * Параметры генерации подзапроса
 */
export interface FilterGeneratorProcessorParams<T extends keyof FilterFieldComponents, K extends keyof Schemas, F extends keyof Schemas[K]['fields']> {
    currentValue: LoadedFilterData<T, K, F>
    originalValue: LoadedFilterData<T, K, F>
}

/**
 * Процессор генерации подзапросов для одного поля опеределенного типа
 */
export interface FilterGeneratorProcessor<T extends keyof FilterFieldComponents> {
    /**
     * Генерация подзапроса для одного поля
     * @param params
     */
    GenerateFilter<K extends keyof Schemas, F extends keyof Schemas[K]['fields']>(params: FilterGeneratorProcessorParams<T, K, F>): string
}