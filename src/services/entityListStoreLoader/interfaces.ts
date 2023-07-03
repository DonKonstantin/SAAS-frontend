import {ListPageConfiguration} from "../../settings/pages/system/list";
import {Schemas} from "../../settings/schema";
import {ListOfSchema} from "../../context/EntityListContext";

/**
 * Загрузчик конфигурации Store
 */
export interface EntityListStoreLoaderInterfaces {
    /**
     * Загрузка Store для переданной конфигурации
     * @param configuration
     * @param additionFilter
     */
    LoadStoreForConfiguration<T extends keyof Schemas>(
        configuration: ListPageConfiguration<T>,
        additionFilter: {[T: string]: string},
    ): Promise<ListOfSchema<T>>
}