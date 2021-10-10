import {ShoulderDTO, ShoulderDTOLoaderInterface} from "./interface";
import {GraphQLClient} from "../../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../../logger/Logger";
import {ShoulderDTOLoaderQuery, ShoulderDTOLoaderQueryResponse} from "./ShoulderDTOLoaderQuery";
import {Unsubscribable} from "rxjs";
import {
    ShoulderDTOLoaderSubscriptionQuery,
    ShoulderDTOLoaderSubscriptionQueryResponse
} from "./ShoulderDTOLoaderSubscriptionQuery";

/**
 * Сервис загрузки DTO данных плеч
 */
export class ShoulderDTOLoader implements ShoulderDTOLoaderInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`ShoulderDTOLoader`);
    }

    /**
     * Загрузка данных ЦП из импорта для переданного списка id
     * @param taskId
     */
    async Load(taskId: string): Promise<ShoulderDTO[]> {
        try {
            const query = new ShoulderDTOLoaderQuery(taskId);
            this.logger.Debug(`Created shoulders DTO load query`, query);

            const resp = await this.client.Query<{taskId: string}, ShoulderDTOLoaderQueryResponse>(
                query,
                {}
            );
            this.logger.Debug(`Loaded shoulders DTO by ID`, resp.result);

            return resp.result
        } catch(e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }

    /**
     * Подписка на изменения плеч
     * Возвращает подписчика в результатах вывода для возможности отписки.
     * @param callback
     */
    Subscribe(callback: { (shoulder: ShoulderDTO): void }): Unsubscribable {
        const subject = this.client.Subscribe<any, ShoulderDTOLoaderSubscriptionQueryResponse>(
            new ShoulderDTOLoaderSubscriptionQuery()
        );

        const subscription = subject.subscribe({
            next: value => {
                const { data } = value;
                this.logger.Debug(`Received data for shoulder DTO`, data);

                if (!data) {
                    return
                }

                const { shoulder: {data: entityData} } = data;
                callback(entityData);
            }
        });

        return {
            unsubscribe(): void {
                subscription.unsubscribe();
                subject.complete();
            }
        };
    }
}