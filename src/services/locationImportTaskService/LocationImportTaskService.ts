import {
    LocationImportTaskServiceInterface,
    LocationImportTask,
    ImportLocation
} from "./interface";
import {LocationToImport} from "../locationsParsingService/types";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {
    LocationImportTaskServiceCreateQuery,
    LocationImportTaskServiceCreateQueryResponse
} from "./LocationImportTaskServiceCreateQuery";
import {
    LocationImportTaskServiceGetByIdQuery,
    LocationImportTaskServiceGetByIdQueryResponse
} from "./LocationImportTaskServiceGetByIdQuery";
import {QueryResponse} from "../listSubscriptionService/Query";
import {LocationImportTaskServiceSubscribeQuery} from "./LocationImportTaskServiceSubscribeQuery";
import {
    ImportLocationsLoadQuery,
    ImportLocationsLoadQueryResponse,
    ImportLocationsLoadQueryVariables
} from "./ImportLocationsLoadQuery";
import {ImportLocationsSubscribeQuery, ImportLocationsSubscribeQueryResponse} from "./ImportLocationsSubscribeQuery";
import {Unsubscribable} from "rxjs";
import {TaskManageServiceInterface} from "./taskManageService/interface";

/**
 * Сервис для работы с заданиями иммпорта
 */
export class LocationImportTaskService implements LocationImportTaskServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;
    private readonly taskManageService: TaskManageServiceInterface;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     * @param taskManageService
     */
    constructor(
        client: GraphQLClient,
        logger: LoggerFactory,
        taskManageService: TaskManageServiceInterface,
    ) {
        this.client = client;
        this.logger = logger.make(`LocationImportTaskService`);
        this.taskManageService = taskManageService;
    }

    /**
     * Создание задания на импорт локаций
     * @param locations
     */
    async CreateTask(locations: LocationToImport[]): Promise<string | undefined> {
        try {
            this.logger.Debug(`Started creating task for locations`, locations);
            if (0 === locations.length) {
                return undefined;
            }

            const query = new LocationImportTaskServiceCreateQuery(locations);
            this.logger.Debug(`Created task creation query`, query);

            const resp = await this.client.Mutation<{locations: LocationToImport[]}, LocationImportTaskServiceCreateQueryResponse>(
                query,
                {}
            );
            this.logger.Debug(`Created task ID`, resp.task.id);

            return resp.task.id
        } catch(e) {
            this.logger.Error(`Some error occurred`, e);
            return undefined;
        }
    }

    /**
     * Загрузка страницы локаций, по переданному номеру страницы и лимиту
     * @param taskId
     * @param page
     * @param limit
     */
    async LoadTaskLocations(taskId: string, page: number, limit: number): Promise<ImportLocation[]> {
        try {
            const query = new ImportLocationsLoadQuery({taskId, limit, offset: page * limit});
            this.logger.Debug(`Created locations load query`, query);

            const resp = await this.client.Query<ImportLocationsLoadQueryVariables, ImportLocationsLoadQueryResponse>(
                query,
                {}
            );
            this.logger.Debug(`Loaded locations`, resp.locations);

            return resp.locations
        } catch(e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }

    /**
     * Подписка на изменения локаций
     * Возвращает подписчика в результатах вывода для возможности отписки.
     * @param callback
     */
    SubscribeToLocations(callback: { (location: ImportLocation): void }): Unsubscribable {
        const subject = this.client.Subscribe<any, ImportLocationsSubscribeQueryResponse>(
            new ImportLocationsSubscribeQuery()
        );

        const subscription = subject.subscribe({
            next: value => {
                const { data } = value;
                this.logger.Debug(`Received data for location`, data);

                if (!data) {
                    return
                }

                const { location: {data: entityData} } = data;
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

    /**
     * Получения задания по переданному ID
     * @param taskId
     */
    async GetTaskById(taskId: string): Promise<LocationImportTask | undefined> {
        try {
            const query = new LocationImportTaskServiceGetByIdQuery(taskId);
            this.logger.Debug(`Created task load query`, query);

            const resp = await this.client.Query<{id: string}, LocationImportTaskServiceGetByIdQueryResponse>(
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
    SubscribeToTaskChanges(taskId: string, callback: { (task: LocationImportTask): void }): Unsubscribable {
        const subject = this.client.Subscribe<any, QueryResponse<"import_task", LocationImportTask>>(
            new LocationImportTaskServiceSubscribeQuery(taskId)
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

    /**
     * Приостановка выполнения задания
     * @param taskId
     */
    PauseTask(taskId: string): Promise<void> {
        return this.taskManageService.PauseTask(taskId)
    }

    /**
     * Отмена выполнения задания
     * @param taskId
     */
    CancelTask(taskId: string): Promise<void> {
        return this.taskManageService.CancelTask(taskId)
    }

    /**
     * Возобновление выполнения задания
     * @param taskId
     */
    ResumeTask(taskId: string): Promise<void> {
        return this.taskManageService.ResumeTask(taskId)
    }

    /**
     * Получение временных данных для задания импорта
     * @param taskId
     */
    GetTaskTemporaryData(taskId: string): Promise<string> {
        return this.taskManageService.GetTaskTemporaryData(taskId);
    }

    /**
     * Запуск отложенного задания
     * @param taskId
     */
    RunTask(taskId: string): Promise<void> {
        return this.taskManageService.RunTask(taskId);
    }

    /**
     * Установка временных данных для задания импорта
     * @param taskId
     * @param data
     */
    SetTaskTemporaryData(taskId: string, data: string): Promise<void> {
        return this.taskManageService.SetTaskTemporaryData(taskId, data);
    }
}