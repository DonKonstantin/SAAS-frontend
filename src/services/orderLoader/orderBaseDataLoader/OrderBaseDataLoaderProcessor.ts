import {_OrderBaseDataLoaderProcessorInterface, _OrderQueryResult, OrderBaseData} from "./interface";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {Logger} from "../../logger/Logger";
import {graphQLClient} from "../../graphQLClient";
import {loggerFactory} from "../../logger";
import {OrderBaseDataLoaderProcessorQuery} from "./OrderBaseDataLoaderProcessorQuery";

// Процессор загрузки данных заказов
export class OrderBaseDataLoaderProcessor implements _OrderBaseDataLoaderProcessorInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор процессора
     */
    constructor() {
        this.client = graphQLClient();
        this.logger = loggerFactory().make("OrderBaseDataLoaderProcessor");
    }

    /**
     * Проверка доступности процессора
     * @param type
     */
    IsAvailable(type: "order" | "preOrder"): boolean {
        return type === "order";
    }

    /**
     * Загрузка данных заказа
     * @param orderId
     */
    async Load(orderId: string): Promise<OrderBaseData | undefined> {
        try {
            const resp = await this.client.Query<{ id: string }, _OrderQueryResult>(
                new OrderBaseDataLoaderProcessorQuery(orderId),
                {}
            );

            this.logger.Debug(`Loaded order data`, resp);
            if (0 === (resp?.data || []).length) {
                return undefined
            }

            return resp.data[0]
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            return undefined
        }
    }
}