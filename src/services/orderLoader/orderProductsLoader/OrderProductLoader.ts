import {_OrderProductLoaderProcessorInterface, OrderProduct, OrderProductLoaderInterface} from "./interface";

// Интерфейс сервиса загрузчика товаров
export class OrderProductLoader implements OrderProductLoaderInterface {
    private readonly processors: _OrderProductLoaderProcessorInterface[];

    /**
     * Конструктор сервиса
     * @param processors
     */
    constructor(...processors: _OrderProductLoaderProcessorInterface[]) {
        this.processors = processors
    }

    /**
     * Загрузка товаров заказа
     * @param type
     * @param orderId
     */
    async Load(type: "order" | "preOrder", orderId: string): Promise<OrderProduct[]> {
        const processor = this.processors.find(p => p.IsAvailable(type));
        if (!processor) {
            throw new Error(`Failed to load order products. Processor not found`);
        }

        return processor.Load(orderId)
    }
}