import {TaskManageServiceInterface} from "./interface";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../logger/Logger";
import {CancelTaskQuery} from "./CancelTaskQuery";
import {PauseTaskQuery} from "./PauseTaskQuery";
import {ResumeTaskQuery} from "./ResumeTaskQuery";
import {RunTaskQuery} from "./RunTaskQuery";
import {GetTaskTemporaryDataQuery, GetTaskTemporaryDataQueryResponse} from "./GetTaskTemporaryDataQuery";
import {SetTaskTemporaryDataQuery} from "./SetTaskTemporaryDataQuery";

/**
 * Сервис управления состоянием задания импорта
 */
export class TaskManageService implements TaskManageServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`TaskManageService`);
    }

    /**
     * Отмена выполнения задания
     * @param taskId
     */
    async CancelTask(taskId: string): Promise<void> {
        try {
            const query = new CancelTaskQuery({id: taskId});
            this.logger.Debug(`Created task query`, query);

            await this.client.Mutation<{ id: string }, void>(query, {});
            this.logger.Debug(`Task cancelled`);

            return;
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }
    }

    /**
     * Приостановка выполнения задания
     * @param taskId
     */
    async PauseTask(taskId: string): Promise<void> {
        try {
            const query = new PauseTaskQuery({id: taskId});
            this.logger.Debug(`Created task query`, query);

            await this.client.Mutation<{ id: string }, void>(query, {});
            this.logger.Debug(`Task paused`);

            return;
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }
    }

    /**
     * Возобновление выполнения задания
     * @param taskId
     */
    async ResumeTask(taskId: string): Promise<void> {
        try {
            const query = new ResumeTaskQuery({id: taskId});
            this.logger.Debug(`Created task query`, query);

            await this.client.Mutation<{ id: string }, void>(query, {});
            this.logger.Debug(`Task resume`);

            return;
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }
    }

    /**
     * Получение временных данных для задания импорта
     * @param taskId
     */
    async GetTaskTemporaryData(taskId: string): Promise<string> {
        try {
            const query = new GetTaskTemporaryDataQuery(taskId);
            this.logger.Debug(`Created task query`, query);

            const resp = await this.client.Query<{ id: string }, GetTaskTemporaryDataQueryResponse>(query, {});
            this.logger.Debug(`Task temporary data loaded`, resp);

            return resp.loadTemporaryData.data
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            return "{}"
        }
    }

    /**
     * Запуск отложенного задания
     * @param taskId
     */
    async RunTask(taskId: string): Promise<void> {
        try {
            const query = new RunTaskQuery({id: taskId});
            this.logger.Debug(`Created task query`, query);

            await this.client.Mutation<{ id: string }, void>(query, {});
            this.logger.Debug(`Task started`);

            return;
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }
    }

    /**
     * Установка временных данных для задания импорта
     * @param taskId
     * @param data
     */
    async SetTaskTemporaryData(taskId: string, data: string): Promise<void> {
        try {
            const query = new SetTaskTemporaryDataQuery(taskId, data);
            this.logger.Debug(`Created task query`, query);

            await this.client.Mutation(query, {});
            this.logger.Debug(`Task temporary data stored`);
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to store temporary data`)
        }
    }
}