import {Schemas} from "../../settings/schema";
import {ListResponse} from "../listDataLoader/listLoader/types";

// Параметры загрузки дочерних сущностей для отображения
export interface TreeRowLoaderParameters<T extends keyof Schemas> {
    schema: T
    primaryKeyValues: any[]
}

/**
 * Сервис загрузки строк для отображения дочерних сущностей
 */
export interface TreeRowLoaderInterface {
    /**
     * Загрузка строк для отображения
     */
    LoadRows<T extends keyof Schemas>(params: TreeRowLoaderParameters<T>): Promise<ListResponse<T>>
}