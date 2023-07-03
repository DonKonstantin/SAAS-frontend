import {
    AvailableFilterField,
    DeclaredFilterFieldPreloadedData,
    FilterFieldComponents, RegisteredFilterFieldBaseComponentValues,
    RegisteredFilterFieldConfiguration
} from "../../types";
import {Schemas} from "../../../../../settings/schema";

// Параметры загрузки данных
export interface FilterLoaderParams<
    C extends keyof FilterFieldComponents,
    T extends keyof Schemas,
    F extends keyof Schemas[T]['fields'],
> {
    configuration: RegisteredFilterFieldConfiguration<T, F>[C]
    baseValues: RegisteredFilterFieldBaseComponentValues[C]
}

/**
 * Процессор загрузки параметров фильтрации
 */
export interface FilterPreloaderProcessorInterface<C extends keyof FilterFieldComponents> {
    /**
     * Загрузка параметров фильтрации
     * @param params
     */
    loadFilterData<
        T extends keyof Schemas,
        F extends keyof Schemas[T]['fields']
    >(params: FilterLoaderParams<C, T, F>): Promise<DeclaredFilterFieldPreloadedData[C]>
}

// Коллекция загрузчиков полей фильтрации
export type FilterPreloaderProcessors = {[P in AvailableFilterField]: FilterPreloaderProcessorInterface<P>}