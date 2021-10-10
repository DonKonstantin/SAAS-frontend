import {ReduxStore} from "../../ReduxStore";
import {DeepPartial} from "../../../services/types";

// Параметры загрузки ReduxStore на стороне сервера
export interface LoadingParams {
    token: string
    initialProps: any
}

/**
 * Загрузчик данных Redux на стороне сервера
 */
export interface ServerSideReduxStoreLoaderInterface {
    /**
     * Загрузка базовых данных Redux на стороне сервера
     * @param params
     */
    Load(params: LoadingParams): Promise<DeepPartial<ReduxStore>>
}

/**
 * Загрузчик данных для определенного хранилища
 */
export interface StoreLoader<T extends keyof ReduxStore> {
    /**
     * Загрузка данных для определенного Store
     * @param params
     */
    Load(params: LoadingParams): Promise<DeepPartial<ReduxStore[T]>>
}

// Коллекция загрузчиков данных
export type Loaders = {[T in keyof ReduxStore]?: StoreLoader<T>}