import {BaseData, ListDataLoaderInterfaces} from "./interfaces";
import {Schemas} from "../../settings/schema";
import {ListLoaderInterface, ListLoadingParameters} from "./listLoader/interfaces";
import {ListResponse} from "./listLoader/types";
import {FilterLoaderInterface, LoadedFiltersData} from "./filterLoader/interfaces";

/**
 * Загрузчик данных для листинга сущностей
 */
export class ListDataLoader implements ListDataLoaderInterfaces {
    private readonly listLoader: ListLoaderInterface;
    private readonly filterLoader: FilterLoaderInterface;

    /**
     * Конструктор сервиса
     * @param listLoader
     * @param filterLoader
     */
    constructor(
        listLoader: ListLoaderInterface,
        filterLoader: FilterLoaderInterface,
    ) {
        this.listLoader = listLoader;
        this.filterLoader = filterLoader
    }

    /**
     * Загрузка листинга сущностей
     * @param params
     */
    async Load<T extends keyof Schemas>(params: ListLoadingParameters<T>): Promise<ListResponse<T>> {
        return await this.listLoader.Load(params);
    }

    /**
     * Загрузка базовых данных
     * @param params
     */
    async LoadBaseData<T extends keyof Schemas>(params: ListLoadingParameters<T>): Promise<BaseData<T>> {
        class DataPromise<T extends keyof Schemas, P extends keyof BaseData<T>> {
            key: P;
            data: LoadedFiltersData<any> | ListResponse<any>
        }

        type BaseDataPromises = { [P in keyof BaseData<T>]: Promise<DataPromise<T, P>> }

        const {filterConfiguration, additionFilter} = params;

        const promises: BaseDataPromises = {
            filter: this.filterLoader.Load(filterConfiguration, additionFilter).then((val: LoadedFiltersData<T>): DataPromise<T, "filter"> => {
                let item = new DataPromise;
                item.key = "filter";
                item.data = val;

                // @ts-ignore
                return item
            }),
            list: this.listLoader.Load(params).then((val: ListResponse<T>): DataPromise<T, "list"> => {
                let item = new DataPromise;
                item.key = "list";
                item.data = val;

                // @ts-ignore
                return item
            })
        };

        let result = new BaseData<T>();

        // @ts-ignore
        (await Promise.all(Object.values(promises)) as DataPromise<T, keyof BaseData<T>>[]).map(item => {
            // @ts-ignore
            result[item.key] = item.data
        });

        result.list.parameters.originalFilterValues = {...result.filter};
        result.list.parameters.currentFilterValues = {...result.filter};
        result.list.parameters.prevFilterValues = {...result.filter};

        return result;
    }
}