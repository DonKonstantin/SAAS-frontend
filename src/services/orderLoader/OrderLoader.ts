import {Order, OrderLoaderInterface} from "./interface";
import {OrderProductLoaderInterface} from "./orderProductsLoader/interface";
import {OrderBaseDataLoaderInterface} from "./orderBaseDataLoader/interface";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";

// Сервис загрузки данных заказов
export class OrderLoader implements OrderLoaderInterface {
    private readonly baseLoader: OrderBaseDataLoaderInterface;
    private readonly productLoader: OrderProductLoaderInterface;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param baseLoader
     * @param productLoader
     */
    constructor(baseLoader: OrderBaseDataLoaderInterface, productLoader: OrderProductLoaderInterface) {
        this.baseLoader = baseLoader;
        this.productLoader = productLoader;
        this.logger = loggerFactory().make(`OrderLoader`)
    }

    /**
     * Загрузка товаров заказа
     * @param type
     * @param orderId
     */
    async Load(type: "order" | "preOrder", orderId: string): Promise<Order> {
        try {
            const [baseOrder, products] = await Promise.all([
                this.baseLoader.Load(type, orderId),
                this.productLoader.Load(type, orderId),
            ]);

            const order: Order = {...baseOrder, products};
            this.logger.Debug(`Loaded order`, order);

            return order
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to load order`)
        }
    }
}