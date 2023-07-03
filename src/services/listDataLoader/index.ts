import {ListDataLoaderInterfaces} from "./interfaces";
import {ListDataLoader} from "./ListDataLoader";
import {listLoader} from "./listLoader";
import {filterLoader} from "./filterLoader";

// Фабрика сервиса
export const listDataLoader: {(token?: string): ListDataLoaderInterfaces} = (token?: string): ListDataLoaderInterfaces => (
    new ListDataLoader(
        listLoader(token),
        filterLoader(token),
    )
)