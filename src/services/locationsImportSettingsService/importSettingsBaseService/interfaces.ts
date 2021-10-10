// Данные настроек импорта
import {Unsubscribable} from "rxjs";

export type ImportSettingsData = {
    id: string
    name: string
    settings_type: string
    settings: string
}

// Данные настроек для создания
export type ImportSettingsInsertData = {
    name: string
    settings_type: string
    settings: string
}

// Данные подписки на изменения настроек импорта
export type SubscriptionData = {
    entityId: string
    eventType: "updated" | "deleted" | "created"
    data: ImportSettingsData | null
}

/**
 * Базовый сервис для работы с настройками импорта
 */
export interface ImportSettingsBaseServiceInterface {
    /**
     * Загрузка настроек по переданному типу
     * @param settingsType
     */
    LoadSettings(settingsType: string): Promise<ImportSettingsData[] | undefined>

    /**
     * Удаление настроек
     * @param id
     */
    DeleteSettingsById(id: string): Promise<void>

    /**
     * Обновление настроек
     * @param settings
     */
    UpdateSettings(settings: ImportSettingsData): Promise<ImportSettingsData | undefined>

    /**
     * Создание настройки
     * @param settings
     */
    CreateSettings(settings: ImportSettingsInsertData): Promise<ImportSettingsData | undefined>

    /**
     * Подписка на события изменения настроек импорта
     * @param callback
     */
    SubscribeChanges(callback: {(data: SubscriptionData): void}): Unsubscribable | undefined
}