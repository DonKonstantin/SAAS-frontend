import {OrderProductLoaderInterface} from "./interface";
import {OrderProductLoader} from "./OrderProductLoader";
import {OrderProductLoaderProcessor} from "./OrderProductLoaderProcessor";
import {PreOrderProductLoaderProcessor} from "./PreOrderProductLoaderProcessor";

// Фабрика сервиса
export const orderProductLoader: {(): OrderProductLoaderInterface} = () => {
    return new OrderProductLoader(
        new OrderProductLoaderProcessor(),
        new PreOrderProductLoaderProcessor(),
    )
};