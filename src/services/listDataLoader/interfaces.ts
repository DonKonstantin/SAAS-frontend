import {Schemas} from "../../settings/schema";
import {LoadedFiltersData} from "./filterLoader/interfaces";
import {ListResponse} from "./listLoader/types";
import {ListLoadingParameters} from "./listLoader/interfaces";

// Базовые данные листинга сущностей
export class BaseData<T extends keyof Schemas> {
    filter: LoadedFiltersData<T>
    list: ListResponse<T>
}

/**
 * Загрузчик данных для листинга сущностей
 */
export interface ListDataLoaderInterfaces {
    /**
     * Загрузка базовых данных
     * @param params
     */
    LoadBaseData<T extends keyof Schemas>(params: ListLoadingParameters<T>): Promise<BaseData<T>>

    /**
     * Загрузка листинга сущностей
     * @param params
     */
    Load<T extends keyof Schemas>(params: ListLoadingParameters<T>): Promise<ListResponse<T>>
}