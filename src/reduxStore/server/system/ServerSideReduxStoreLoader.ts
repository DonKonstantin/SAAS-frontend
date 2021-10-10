import {Loaders, LoadingParams, ServerSideReduxStoreLoaderInterface} from "./index";
import {DeepPartial} from "../../../services/types";
import {ReduxStore} from "../../ReduxStore";

/**
 * Загрузчик данных Redux на стороне сервера
 */
export class ServerSideReduxStoreLoader implements ServerSideReduxStoreLoaderInterface {

    private readonly loaders: Loaders

    /**
     * Конструктор службы
     * @param loaders
     */
    constructor(loaders: Loaders) {
        this.loaders = loaders
    }

    /**
     * Загрузка базовых данных Redux на стороне сервера
     * @param params
     */
    async Load(params: LoadingParams): Promise<DeepPartial<ReduxStore>> {
        type StoreLoadResult<T extends keyof Loaders> = {
            type: T,
            result: DeepPartial<ReduxStore[T]>
        }

        // Генерируем промисы на загрузку всех данных
        const promises = Object.keys(this.loaders).map((loaderKey: keyof Loaders): Promise<StoreLoadResult<keyof Loaders>> | undefined => {
            // @ts-ignore
            return this.loaders[loaderKey]?.Load(params).then(val => {
                let item: StoreLoadResult<keyof Loaders> = {
                    type: loaderKey,
                    result: val,
                }

                return item
            })
        })

        // Собираем результаты загрузки вместе
        const loaded = await Promise.all(promises)
        return loaded.reduce<DeepPartial<ReduxStore>>(
            (result: DeepPartial<ReduxStore>, item: StoreLoadResult<keyof Loaders> | undefined) => {
                if (undefined === item) {
                    return {...result}
                }

                return {
                    ...result,
                    [item.type]: item.result,
                }
            },
            {}
        );
    }
}