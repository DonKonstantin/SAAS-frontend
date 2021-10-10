import {TnvedProduct, TnvedProductServiceInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {GetProductsBySkuQuery, GetProductsBySkuQueryResponse} from "./GetProductsBySkuQuery";

// Сервис для работы с товарами ТНВЭД
export class TnvedProductService implements TnvedProductServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`TnvedProductService`);
    }

    /**
     * Получение списка товаров по переданному списку артикулов
     * @param sku
     * @param companyId
     */
    async GetProductsBySku(sku: string[], companyId: number): Promise<TnvedProduct[]> {
        try {
            const response = await this.client.Query<{sku: string[], companyId: number}, GetProductsBySkuQueryResponse>(
                new GetProductsBySkuQuery(sku, companyId),
                {},
            );
            this.logger.Debug(`Loaded products by SKU`, response);

            return response.tnved_company_product_list
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to load products by SKU`)
        }
    }
}