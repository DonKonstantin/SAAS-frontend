import {_OrderBaseDataLoaderProcessorInterface, OrderBaseData, OrderBaseDataLoaderInterface} from "./interface";

// Сервис загрузки базовых данных заказа
export class OrderBaseDataLoader implements OrderBaseDataLoaderInterface {
    private readonly processors: _OrderBaseDataLoaderProcessorInterface[];

    /**
     * Конструктор сервиса
     * @param processors
     */
    constructor(...processors: _OrderBaseDataLoaderProcessorInterface[]) {
        this.processors = processors
    }

    /**
     * Загрузка данных заказа
     * @param type
     * @param orderId
     */
    async Load(type: "order" | "preOrder", orderId: string): Promise<OrderBaseData> {
        const processor = this.processors.find(p => p.IsAvailable(type));
        if (!processor) {
            throw new Error(`Failed to load order. Processor not found`)
        }

        const result = await processor.Load(orderId);
        if (!result) {
            throw new Error(`Failed to load order. Processor not returned result`)
        }

        return result;
    }
}