import {ShoulderImportTaskServiceInterface} from "./interface";
import {ShoulderImportTaskCreateServiceInterface} from "../shoulderImportTaskCreateService/interface";
import {ShoulderImportTask, ShoulderImportTaskGetterInterface} from "../shoulderImportTaskGetter/interface";
import {ShoulderImportTaskLoaderInterface} from "../shoulderImportTaskLoader/interface";
import {TaskManageServiceInterface} from "../../locationImportTaskService/taskManageService/interface";
import {Shoulder} from "../shoulderTypes";
import {ShoulderDTO} from "../shoulderImportTaskLoader/shoulderDTOLoader/interface";
import {Unsubscribable} from "rxjs";
import {WithProcessingStatus} from "../baseTypes";

/**
 * Сервис для управления заданиями импорта ставок
 */
export class ShoulderImportTaskService implements ShoulderImportTaskServiceInterface {
    private readonly shoulderImportTaskCreateService: ShoulderImportTaskCreateServiceInterface;
    private readonly shoulderImportTaskGetter: ShoulderImportTaskGetterInterface;
    private readonly shoulderImportTaskLoader: ShoulderImportTaskLoaderInterface;
    private readonly taskManageService: TaskManageServiceInterface;

    /**
     * Конструктор сервиса
     * @param shoulderImportTaskCreateService
     * @param shoulderImportTaskGetter
     * @param shoulderImportTaskLoader
     * @param taskManageService
     */
    constructor(
        shoulderImportTaskCreateService: ShoulderImportTaskCreateServiceInterface,
        shoulderImportTaskGetter: ShoulderImportTaskGetterInterface,
        shoulderImportTaskLoader: ShoulderImportTaskLoaderInterface,
        taskManageService: TaskManageServiceInterface,
    ) {
        this.shoulderImportTaskCreateService = shoulderImportTaskCreateService;
        this.shoulderImportTaskGetter = shoulderImportTaskGetter;
        this.shoulderImportTaskLoader = shoulderImportTaskLoader;
        this.taskManageService = taskManageService;
    }

    /**
     * Отмена выполнения задания
     * @param taskId
     */
    CancelTask(taskId: string): Promise<void> {
        return this.taskManageService.CancelTask(taskId);
    }

    /**
     * Создание задания на импорт ставок
     * @param shoulders
     */
    CreateTask(shoulders: Shoulder[]): Promise<string | undefined> {
        return this.shoulderImportTaskCreateService.CreateTask(shoulders);
    }

    /**
     * Получения задания по переданному ID
     * @param taskId
     */
    GetTaskById(taskId: string): Promise<ShoulderImportTask | undefined> {
        return this.shoulderImportTaskGetter.GetTaskById(taskId);
    }

    /**
     * Загрузка списка плеч
     * @param taskId
     */
    LoadTaskShoulders(taskId: string): Promise<WithProcessingStatus<Shoulder>[]> {
        return this.shoulderImportTaskLoader.LoadTaskShoulders(taskId);
    }

    /**
     * Приостановка выполнения задания
     * @param taskId
     */
    PauseTask(taskId: string): Promise<void> {
        return this.taskManageService.PauseTask(taskId);
    }

    /**
     * Возобновление выполнения задания
     * @param taskId
     */
    ResumeTask(taskId: string): Promise<void> {
        return this.taskManageService.ResumeTask(taskId);
    }

    /**
     * Подписка на изменения плеч
     * Возвращает подписчика в результатах вывода для возможности отписки.
     * @param callback
     */
    SubscribeToShoulders(callback: { (shoulder: WithProcessingStatus<ShoulderDTO>): void }): Unsubscribable {
        return this.shoulderImportTaskLoader.SubscribeToShoulders(callback);
    }

    /**
     * Подписка на изменения в задаче по переданному ID задачи
     * @param taskId
     * @param callback
     */
    SubscribeToTaskChanges(taskId: string, callback: { (task: ShoulderImportTask): void }): Unsubscribable {
        return this.shoulderImportTaskGetter.SubscribeToTaskChanges(taskId, callback);
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