import {Schemas} from "../../../settings/schema";
import {ListFieldsConfiguration, ListOrderType, ListResponse} from "./types";
import {LoadedFilterValues} from "../filterLoader/filterValueLoader/interfaces";
import {FilterFieldsConfiguration} from "../filterLoader/types";

// Параметры запроса листинга сущностей
export interface ListLoadingParameters<T extends keyof Schemas> {
    schema: T;
    additionFilter: {[T: string]: string};
    listConfiguration: ListFieldsConfiguration<any>;
    filterConfiguration: FilterFieldsConfiguration<T>;
    originalFilterValues?: LoadedFilterValues<T>;
    currentFilterValues?: LoadedFilterValues<T>;
    prevFilterValues?: LoadedFilterValues<T>;
    limit: number;
    offset: number;
    order: OrderParameter<T>[];
    listOrderType: ListOrderType;
}

// Параметры сортировки
export interface OrderParameter<T extends keyof Schemas> {
    by: keyof Schemas[T]['fields']
    direction: "desc" | "asc"
    priority: number
}

/**
 * Загрузчик листинга сущностей
 */
export interface ListLoaderInterface {
    /**
     * Загрузка листинга сущностей
     * @param params
     */
    Load<T extends keyof Schemas>(params: ListLoadingParameters<T>): Promise<ListResponse<T>>
}