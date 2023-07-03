import {ListLoadingParameters} from "../listDataLoader/listLoader/interfaces";
import {Schemas} from "../../settings/schema";

/**
 * Интерфейс сервиса удаления сущностей
 */
export interface EntityDeleteServiceInterface {
    /**
     * Удаление сущностей по переданному списку ID
     * @param params
     * @param items
     */
    DeleteItemsById<T extends keyof Schemas>(params: ListLoadingParameters<T>, items: any[]): Promise<boolean>
}