import {_OrderProductLoaderProcessorInterface, _OrderProductLoaderResponse, OrderProduct} from "./interface";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {Logger} from "../../logger/Logger";
import {graphQLClient} from "../../graphQLClient";
import {loggerFactory} from "../../logger";
import {OrderProductLoaderProcessorQuery} from "./OrderProductLoaderProcessorQuery";

// Процессора загрузки товаров заказов
export class OrderProductLoaderProcessor implements _OrderProductLoaderProcessorInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор процессора
     */
    constructor() {
        this.client = graphQLClient();
        this.logger = loggerFactory().make("OrderProductLoaderProcessor");
    }

    /**
     * Проверка доступности процессора
     * @param type
     */
    IsAvailable(type: "order" | "preOrder"): boolean {
        return type === "order";
    }

    /**
     * Загрузка товаров заказа
     * @param orderId
     */
    async Load(orderId: string): Promise<OrderProduct[]> {
        try {
            const resp = await this.client.Query<{ id: string }, _OrderProductLoaderResponse>(
                new OrderProductLoaderProcessorQuery(orderId),
                {}
            );

            this.logger.Debug(`Loaded order products data`, resp);
            if (0 === (resp?.data || []).length) {
                throw new Error(`Failed to load products. Empty response`)
            }

            return resp.data
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to load products. Query error`)
        }
    }
}