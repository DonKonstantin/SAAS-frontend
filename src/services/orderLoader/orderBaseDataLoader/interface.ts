// Базовые данные заказа
export type OrderBaseData = {
    currency_id: string
    currency_nominal: number
    currency_rate: number
    customer_email: string
    customer_name: string
    customer_phone: string
    date: string
    id: string
    language_id: string
    order_price: number
}

// Сервис загрузки базовых данных заказа
export interface OrderBaseDataLoaderInterface {
    // Загрузка данных заказа
    Load(type: "order" | "preOrder", orderId: string): Promise<OrderBaseData>
}

// Процессор загрузка базовых данных заказа
export interface _OrderBaseDataLoaderProcessorInterface {
    // Проверка доступности процессора
    IsAvailable(type: "order" | "preOrder"): boolean

    // Загрузка данных заказа
    Load(orderId: string): Promise<OrderBaseData | undefined>
}

// Результат выполнения запроса загрузки данных заказа
export type _OrderQueryResult = {
    data: OrderBaseData[]
};