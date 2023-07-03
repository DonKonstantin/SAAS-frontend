import {Schemas} from "../../../../settings/schema";
import {ListFieldRow} from "../types";
import {ListLoadingParameters} from "../interfaces";

// Результат базового запроса
export type QueryRow<T extends keyof Schemas> = {[P in keyof Schemas[T]['fields']]: any}
export type RowResult<T extends keyof Schemas> = {
    [P in T]: QueryRow<T>[]
}

// Результат запроса получения количества
export type CountResult<T extends keyof Schemas> = {
    [P in T]: {
        count: number
    }[]
}

/**
 * Сервис генерации основного запроса листинга сущностей и парсинга результатов
 */
export interface QueryGeneratorInterface {
    /**
     * Генерация запроса листинга сущностей
     * @param params
     */
    GenerateQuery<T extends keyof Schemas>(params: ListLoadingParameters<T>): {list: string, count: string}

    /**
     * Генерация листинга значений по данным базового запроса
     * @param params
     * @param rowResult
     */
    GenerateValuesByRowResult<T extends keyof Schemas>(
        params: ListLoadingParameters<T>,
        rowResult: RowResult<T>
    ): Promise<ListFieldRow<T>[]>
}