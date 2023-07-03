import {Schemas} from "../../../settings/schema";
import {
    DeclaredFilterFieldPreloadedData,
    FilterFieldComponents,
    FilterFieldsConfiguration,
    RegisteredFilterFieldComponentValues,
    RegisteredFilterFieldConfiguration
} from "./types";

// Загруженные данные для поля фильтра
export type LoadedFiltersData<T extends keyof Schemas> = {[F in keyof Schemas[T]['fields']]?: LoadedFilterData<keyof FilterFieldComponents, T, F>}
export interface LoadedFilterData<
    C extends keyof FilterFieldComponents,
    T extends keyof Schemas,
    F extends keyof Schemas[T]['fields']
> {
    value: RegisteredFilterFieldComponentValues[C]
    configuration: RegisteredFilterFieldConfiguration<T, F>[C]
    preloaded: DeclaredFilterFieldPreloadedData[C]
}

/**
 * Загрузчик данных фильтра
 */
export interface FilterLoaderInterface {
    /**
     * Загрузка данных фильтра
     * @param configuration
     * @param additionFilter
     */
    Load<T extends keyof Schemas>(
        configuration: FilterFieldsConfiguration<T>,
        additionFilter: {[T: string]: string},
    ): Promise<LoadedFiltersData<T>>
}