import {Unsubscribable} from "rxjs";

// Статус задания импорта локаций
export type ShoulderTaskType =
    "cancelled" |
    "paused" |
    "in_queue" |
    "in_progress" |
    "complete" |
    "error"
    ;

// Задание импорта ставки
export type ShoulderImportTask = {
    id: string
    processed_objects_quantity: number
    status: ShoulderTaskType
    total_objects_quantity: number
};

/**
 * Сервис получения данных задания импорта ставок
 */
export interface ShoulderImportTaskGetterInterface {
    /**
     * Получения задания по переданному ID
     * @param taskId
     */
    GetTaskById(taskId: string): Promise<ShoulderImportTask | undefined>

    /**
     * Подписка на изменения в задаче по переданному ID задачи
     * @param taskId
     * @param callback
     */
    SubscribeToTaskChanges(taskId: string, callback: {(task: ShoulderImportTask): void}): Unsubscribable
}