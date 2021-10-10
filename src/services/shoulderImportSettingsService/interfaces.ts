import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";

// Сохраненная конфигурация импорта
export type StoredImportShoulderConfiguration = {
    id: string
    name: string
    configuration: ImportShoulderConfiguration
};

/**
 * Интерфейс сервиса для работы с конфигурацией импорта
 */
export interface ShoulderImportTaskServiceInterface {
    /**
     * Получение доступных конфигураций
     */
    GetSettings(): Promise<StoredImportShoulderConfiguration[]>

    /**
     * Сохранение конфигурации
     * @param settings
     */
    StoreSettings(settings: StoredImportShoulderConfiguration): Promise<StoredImportShoulderConfiguration | undefined>

    /**
     * Удаление конфигурации
     * @param settings
     */
    DeleteSettings(settings: StoredImportShoulderConfiguration): Promise<void>
}