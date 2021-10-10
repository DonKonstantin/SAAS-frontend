import {Shoulder} from "../shoulderTypes";

/**
 * Сервис для управления заданиями импорта ставок
 */
export interface ShoulderImportTaskCreateServiceInterface {
    /**
     * Создание задания на импорт ставок
     * @param shoulders
     */
    CreateTask(shoulders: Shoulder[]): Promise<string | undefined>
}