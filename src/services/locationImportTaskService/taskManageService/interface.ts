/**
 * Сервис управления состоянием задания импорта
 */
export interface TaskManageServiceInterface {
    /**
     * Приостановка выполнения задания
     * @param taskId
     */
    PauseTask(taskId: string): Promise<void>

    /**
     * Отмена выполнения задания
     * @param taskId
     */
    CancelTask(taskId: string): Promise<void>

    /**
     * Возобновление выполнения задания
     * @param taskId
     */
    ResumeTask(taskId: string): Promise<void>

    /**
     * Запуск отложенного задания
     * @param taskId
     */
    RunTask(taskId: string): Promise<void>

    /**
     * Получение временных данных для задания импорта
     * @param taskId
     */
    GetTaskTemporaryData(taskId: string): Promise<string>

    /**
     * Установка временных данных для задания импорта
     * @param taskId
     * @param data
     */
    SetTaskTemporaryData(taskId: string, data: string): Promise<void>
}