import {StoreResult, TnvedProductToImport, TnvedProductsToImportServiceInterface} from "./interface";
import {
    SubscribeToProductsChangesQuery,
    SubscribeToProductsChangesQueryResponse
} from "./SubscribeToProductsChangesQuery";
import {FetchResult} from "apollo-link";
import {Subject} from "rxjs";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {DeleteTnvedProductQuery} from "./DeleteTnvedProductQuery";
import {LoadProductsForTaskQuery, LoadProductsForTaskQueryResponse} from "./LoadProductsForTaskQuery";
import {throttleTime} from "rxjs/operators";
import {DeleteTnvedProductsQuery} from "./DeleteTnvedProductsQuery";
import {splitArrayToParts} from "../helpers/SplitArrayToParts";
import {StoreTnvedProductsQuery} from "./StoreTnvedProductsQuery";
import {TnvedProductServiceInterface} from "../tnvedProductService/interface";

/**
 * Сервис для работы с товарами ТНВЭД, подготовленными для импорта
 */
export class TnvedProductsToImportService implements TnvedProductsToImportServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;
    private readonly tnvedProductService: TnvedProductServiceInterface;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     * @param tnvedProductService
     */
    constructor(client: GraphQLClient, logger: LoggerFactory, tnvedProductService: TnvedProductServiceInterface) {
        this.client = client;
        this.logger = logger.make(`TnvedProductsToImportService`);
        this.tnvedProductService = tnvedProductService;
    }

    /**
     * Удаление товара из задания импорта
     * @param taskId
     * @param productImportId
     */
    async DeleteTnvedProduct(taskId: string, productImportId: string): Promise<void> {
        try {
            await this.client.Query<{ taskId: string, productImportId: string }, void>(
                new DeleteTnvedProductQuery(taskId, productImportId),
                {},
            );
            this.logger.Debug(`Deleted tnved product for task`, taskId, productImportId);
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to delete tnved product to import`);
        }
    }

    /**
     * Получение листинга товаров по ID задания импорта
     * @param taskId
     */
    async LoadProductsForTask(taskId: string): Promise<TnvedProductToImport[]> {
        try {
            const response = await this.client.Query<{ taskId: string }, LoadProductsForTaskQueryResponse>(
                new LoadProductsForTaskQuery(taskId),
                {},
            );
            this.logger.Debug(`Loaded TNVED products to import for task`, response);

            return response.tnved_company_product_to_import_list
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to load tnved product to import`);
        }
    }

    /**
     * Сохранение товаров в переданной задаче
     * @param taskId
     * @param products
     */
    StoreTnvedProducts(taskId: string, products: TnvedProductToImport[]): StoreResult {
        const subject$ = new Subject<number>();
        const callback = async () => {
            try {
                await this.client.Query<{ taskId: string }, void>(
                    new DeleteTnvedProductsQuery(taskId),
                    {},
                );
                this.logger.Debug(`Dropped previous products for task`, taskId);

                if (0 === products.length) {
                    return
                }

                const PART_SIZE = 90;
                const parts = splitArrayToParts(products, PART_SIZE);

                for (let i = 0; i < parts.length; i++) {
                    let part = parts[i];

                    // Подбираем товары по артикулу
                    const sku = part.map(p => p.sku);
                    const existProducts = await this.tnvedProductService.GetProductsBySku(sku, part[0].company_id);

                    part = part.map(partProduct => {
                        const existProduct = existProducts.find(e => e.sku === partProduct.sku);
                        if (!existProduct) {
                            return partProduct
                        }

                        partProduct.id = parseInt(existProduct.id);

                        const newNames: string[] = [...existProduct.name];
                        partProduct.name.forEach(name => {
                            if (newNames.includes(name)) {
                                return;
                            }

                            newNames.push(name);
                        });

                        partProduct.name = newNames;

                        return partProduct;
                    });

                    await this.client.Query<{ task: string, products: Partial<TnvedProductToImport>[] }, void>(
                        new StoreTnvedProductsQuery(taskId, part),
                        {},
                    );

                    this.logger.Debug(`Saved TNVED products to import part`, part);

                    subject$.next(Math.round((i + 1) / parts.length * 100))
                }
            } catch (e) {
                this.logger.Error(`Some error occurred`, e);

                throw new Error(`Failed to store tnved product to import`);
            }
        };

        return {
            progress: subject$.pipe(throttleTime(500)),
            run: callback,
        }
    }

    /**
     * Подписка на события изменения в товарах ТНВЭД
     */
    SubscribeToProductsChanges(): Subject<FetchResult<SubscribeToProductsChangesQueryResponse>> {
        return this.client.Subscribe<null, SubscribeToProductsChangesQueryResponse>(
            new SubscribeToProductsChangesQuery(),
        );
    }
}