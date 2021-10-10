import {LocationParsingConfiguration} from "../locationsParsingService/interface";

export interface LocationConfiguration {
    id: string
    name: string
    configuration: LocationParsingConfiguration
}

/**
 * Коллекция настроек импорта
 */
export interface LocationsImportSettingsServiceInterface {
    /**
     * Получение конфигураций импорта
     */
    GetLocationSettings(): Promise<LocationConfiguration[]>

    /**
     * Сохранение конфигурации импорта
     * @param settings
     */
    StoreImportSettings(settings: LocationConfiguration): Promise<LocationConfiguration | undefined>

    /**
     * Удаление конфигурации импорта
     * @param settings
     */
    DeleteImportSettings(settings: LocationConfiguration): Promise<void>
}