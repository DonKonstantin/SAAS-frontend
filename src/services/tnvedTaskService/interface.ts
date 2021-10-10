import {Subject} from "rxjs";
import {FetchResult} from "@apollo/client";
import {SubscribeToTaskChangesQueryResponse} from "./SubscribeToTaskChangesQuery";

// Статус задания импорта товаров ТНВЭД
export type TnvedImportTaskType =
    "cancelled"
    | "paused"
    | "in_queue"
    | "in_progress"
    | "complete"
    | "error"
    | "on_preparation"
;

// Задание импорта товаров ТНВЭД
export type TnvedImportTask = {
    id: string
    processed_objects_quantity: number
    status: TnvedImportTaskType
    total_objects_quantity: number
};

// Сервис для работы с заданиями импорта товаров ТНВЭД
export interface TnvedTaskServiceInterface {
    // Создание нового задания импорта товаров ТНВЭД
    CreateNewTask(): Promise<string>

    // Загрузка задания импорта ставок ТНВЭД
    LoadTaskById(taskId: string): Promise<TnvedImportTask>

    // Подписка на изменения в задании импорта ставок ТНВЭД
    SubscribeToTaskChanges(taskId: string): Subject<FetchResult<SubscribeToTaskChangesQueryResponse>>
}