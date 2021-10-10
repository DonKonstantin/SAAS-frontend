import {LocationToImport} from "../locationsParsingService/types";
import {Unsubscribable} from "rxjs";
import {TaskManageServiceInterface} from "./taskManageService/interface";

// Статус задания импорта локаций
export type LocationTaskType =
    "cancelled" |
    "paused" |
    "in_queue" |
    "in_progress" |
    "complete" |
    "error"
;

// Задание импорта локации
export type LocationImportTask = {
    id: string
    processed_objects_quantity: number
    status: LocationTaskType
    total_objects_quantity: number
};

// Локация из задания импорта
export type ImportLocation = {
    default_name: string
    error: string
    import_id: string
    import_task_id: string
    is_processed: boolean
    symbol_code: string
};

/**
 * Сервис работы с заданиями импорта
 */
export interface LocationImportTaskServiceInterface extends TaskManageServiceInterface {
    /**
     * Создание задания на импорт локаций
     * @param locations
     */
    CreateTask(locations: LocationToImport[]): Promise<string | undefined>

    /**
     * Получения задания по переданному ID
     * @param taskId
     */
    GetTaskById(taskId: string): Promise<LocationImportTask | undefined>

    /**
     * Подписка на изменения в задаче по переданному ID задачи
     * @param taskId
     * @param callback
     */
    SubscribeToTaskChanges(taskId: string, callback: {(task: LocationImportTask): void}): Unsubscribable

    /**
     * Загрузка страницы локаций, по переданному номеру страницы и лимиту
     * @param taskId
     * @param page
     * @param limit
     */
    LoadTaskLocations(taskId: string, page: number, limit: number): Promise<ImportLocation[]>

    /**
     * Подписка на изменения локаций
     * Возвращает подписчика в результатах вывода для возможности отписки.
     * @param callback
     */
    SubscribeToLocations(callback: {(location: ImportLocation): void}): Unsubscribable
}