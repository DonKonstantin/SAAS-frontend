import {OrderBaseData} from "./orderBaseDataLoader/interface";
import {OrderProduct} from "./orderProductsLoader/interface";

// Загруженный заказ
export type Order = OrderBaseData & {
    products: OrderProduct[]
}

// Сервис загрузки данных заказов
export interface OrderLoaderInterface {
    // Загрузка товаров заказа
    Load(type: "order" | "preOrder", orderId: string): Promise<Order>
}