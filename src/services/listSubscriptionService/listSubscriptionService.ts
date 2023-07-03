import {ListSubscriptionServiceInterface} from "./interfaces";
import {Schemas} from "../../settings/schema";
import {ListFieldRow} from "../listDataLoader/listLoader/types";
import {QueryGeneratorInterface} from "./queryGenerator/interface";
import {Logger, LoggerFactory} from "../logger/Logger";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Query, QueryResponse} from "./Query";
import {QueryRow} from "../listDataLoader/listLoader/queryGenerator/interfaces";
import {Unsubscribable} from "rxjs/internal/types";

/**
 * Сервис генерации подписки на событие изменения сущностей
 */
export class ListSubscriptionService implements ListSubscriptionServiceInterface {
    private readonly queryGenerator: QueryGeneratorInterface;
    private readonly logger: Logger;
    private readonly client: GraphQLClient;

    /**
     * Конструктор сервиса
     *
     * @param queryGenerator
     * @param logger
     * @param client
     */
    constructor(queryGenerator: QueryGeneratorInterface, logger: LoggerFactory, client: GraphQLClient) {
        this.queryGenerator = queryGenerator;
        this.logger = logger.make(`ListSubscriptionService`);
        this.client = client;
    }

    /**
     * Генерация подписки на событие изменения сущностей
     * @param schema
     * @param callback
     */
    SubscribeToChanges<T extends keyof Schemas>(
        schema: T,
        callback: {(eventType: "updated" | "deleted", changedRow: ListFieldRow<T>): void},
    ): Unsubscribable | undefined {
        try {
            const query = this.queryGenerator.GenerateQuery(schema);
            const subject = this.client.Subscribe<any, QueryResponse<T, QueryRow<T>>>(new Query(query));
            const subscription = subject.subscribe({
                next: values => {
                    if (!!values.errors) {
                        this.logger.Error(`Failed to receive event data`, values.errors);

                        return;
                    }

                    const {data: baseData} = values;
                    if (!!baseData) {
                        const {data, eventType} = baseData[schema];
                        this.logger.Debug(`Received event data`, data, eventType);

                        const processedData = this.queryGenerator.ParseRow(schema, data);
                        if (!processedData) {
                            return;
                        }

                        processedData.then(value => {
                            this.logger.Debug(`Received event value`, value);

                            if (!value) {
                                return
                            }

                            callback(eventType, value)
                        });

                    }
                },
            });

            return {
                unsubscribe(): void {
                    subscription.unsubscribe();
                    subject.complete();
                }
            };
        } catch (e) {
            this.logger.Error(`Failed to create subscription`, e);
            return undefined;
        }
    }

}