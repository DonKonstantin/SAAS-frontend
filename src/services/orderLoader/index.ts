import {OrderLoaderInterface} from "./interface";
import {OrderLoader} from "./OrderLoader";
import {orderBaseDataLoader} from "./orderBaseDataLoader";
import {orderProductLoader} from "./orderProductsLoader";

// Фабрика сервиса
export const orderLoader: {(): OrderLoaderInterface} = () => {
    return new OrderLoader(
        orderBaseDataLoader(),
        orderProductLoader(),
    )
};