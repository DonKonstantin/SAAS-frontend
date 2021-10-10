import {ShoulderImportTask, ShoulderImportTaskGetterInterface} from "./interface";
import {Unsubscribable} from "rxjs";
import {
    ShoulderImportTaskGetterGetQuery,
    ShoulderImportTaskGetterGetQueryResponse
} from "./ShoulderImportTaskGetterGetQuery";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../logger/Logger";
import {QueryResponse} from "../../listSubscriptionService/Query";
import {ShoulderImportTaskGetterSubscribeQuery} from "./ShoulderImportTaskGetterSubscribeQuery";

/**
 * Сервис получения данных задания импорта ставок
 */
export class ShoulderImportTaskGetter implements ShoulderImportTaskGetterInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`ShoulderImportTaskGetter`);
    }

    /**
     * Получения задания по переданному ID
     * @param taskId
     */
    async GetTaskById(taskId: string): Promise<ShoulderImportTask | undefined> {
        try {
            const query = new ShoulderImportTaskGetterGetQuery(taskId);
            this.logger.Debug(`Created task load query`, query);

            const resp = await this.client.Query<{id: string}, ShoulderImportTaskGetterGetQueryResponse>(
                query,
                {}
            );
            this.logger.Debug(`Loaded task by ID`, resp.tasks);

            return resp.tasks[0]
        } catch(e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }
    }

    /**
     * Подписка на изменения в задаче по переданному ID задачи
     * @param taskId
     * @param callback
     */
    SubscribeToTaskChanges(taskId: string, callback: { (task: ShoulderImportTask): void }): Unsubscribable {
        const subject = this.client.Subscribe<any, QueryResponse<"import_task", ShoulderImportTask>>(
            new ShoulderImportTaskGetterSubscribeQuery(taskId)
        );

        const subscription = subject.subscribe(value => {
            const { data } = value;
            this.logger.Debug(`Received data for task`, data);

            if (!data) {
                return
            }

            const { import_task: {data: entityData} } = data;
            callback(entityData);
        });

        return {
            unsubscribe(): void {
                subscription.unsubscribe();
                subject.complete();
            }
        };
    }
}