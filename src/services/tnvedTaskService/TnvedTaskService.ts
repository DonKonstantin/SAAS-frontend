import {TnvedImportTask, TnvedTaskServiceInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {TnvedTaskServiceCreateQuery, TnvedTaskServiceCreateQueryResponse} from "./TnvedTaskServiceCreateQuery";
import {LoadTaskByIdQuery, LoadTaskByIdQueryResponse} from "./LoadTaskByIdQuery";
import {SubscribeToTaskChangesQuery, SubscribeToTaskChangesQueryResponse} from "./SubscribeToTaskChangesQuery";

/**
 * Сервис для работы с заданиями импорта товаров ТНВЭД
 */
export class TnvedTaskService implements TnvedTaskServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`TnvedTaskService`);
    }

    /**
     * Создание нового задания импорта товаров ТНВЭД
     */
    async CreateNewTask(): Promise<string> {
        try {
            const resp = await this.client.Mutation<null, TnvedTaskServiceCreateQueryResponse>(
                new TnvedTaskServiceCreateQuery(),
                {}
            );

            this.logger.Debug(`Created import tnved products task`, resp);

            return resp.result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to create import task`)
        }
    }

    /**
     * Загрузка задания импорта ставок ТНВЭД
     * @param taskId
     */
    async LoadTaskById(taskId: string): Promise<TnvedImportTask> {
        try {
            const resp = await this.client.Query<{id: string}, LoadTaskByIdQueryResponse>(
                new LoadTaskByIdQuery(taskId),
                {}
            );
            if (0 === resp.result.length) {
                throw new Error(`Loaded empty tasks list`)
            }

            this.logger.Debug(`Loaded import task data`, resp);

            return resp.result[0]
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to load import task by ID`)
        }
    }

    /**
     * Подписка на изменения в задании импорта ставок ТНВЭД
     * @param taskId
     */
    SubscribeToTaskChanges(taskId: string): any {
        return this.client.Subscribe<{id: string}, SubscribeToTaskChangesQueryResponse>(
            new SubscribeToTaskChangesQuery(taskId),
        );
    }
}