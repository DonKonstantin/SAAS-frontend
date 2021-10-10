import {OrderBaseDataLoaderInterface} from "./interface";
import {OrderBaseDataLoader} from "./OrderBaseDataLoader";
import {OrderBaseDataLoaderProcessor} from "./OrderBaseDataLoaderProcessor";
import {PreOrderBaseDataLoaderProcessor} from "./PreOrderBaseDataLoaderProcessor";

// Фабрика сервиса
export const orderBaseDataLoader: {(): OrderBaseDataLoaderInterface} = () => {
    return new OrderBaseDataLoader(
        new OrderBaseDataLoaderProcessor(),
        new PreOrderBaseDataLoaderProcessor(),
    )
};