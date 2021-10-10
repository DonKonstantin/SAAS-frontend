// Товар заказа
export type OrderProduct = {
    id: string
    amount: number
    price: number
    product_type: "route"
    data: string
};

// Интерфейс сервиса загрузчика товаров
export interface OrderProductLoaderInterface {
    // Загрузка товаров заказа
    Load(type: "order" | "preOrder", orderId: string): Promise<OrderProduct[]>
}

// Процессора загрузки заказов
export interface _OrderProductLoaderProcessorInterface {
    // Проверка доступности процессора
    IsAvailable(type: "order" | "preOrder"): boolean

    // Загрузка товаров заказа
    Load(orderId: string): Promise<OrderProduct[]>
}

// Результат выполнения запроса товаров заказа
export type _OrderProductLoaderResponse = {
    data: OrderProduct[]
};