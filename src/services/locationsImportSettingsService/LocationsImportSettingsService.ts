import {LocationsImportSettingsServiceInterface, LocationConfiguration} from "./interface";
import {ImportSettingsBaseServiceInterface, ImportSettingsData} from "./importSettingsBaseService/interfaces";
import {escape, unescape} from 'html-escaper';

/**
 * Коллекция настроек импорта
 */
export class LocationsImportSettingsService implements LocationsImportSettingsServiceInterface {

    private readonly importSettingsBaseService: ImportSettingsBaseServiceInterface;

    /**
     * Конструктор сервиса
     * @param importSettingsBaseService
     */
    constructor(importSettingsBaseService: ImportSettingsBaseServiceInterface) {
        this.importSettingsBaseService = importSettingsBaseService;
    }

    /**
     * Асинхронная загрузка базовых данных
     */
    async GetLocationSettings(): Promise<LocationConfiguration[]> {
        const baseData = await this
            .importSettingsBaseService
            .LoadSettings("location_import")
        ;

        if (!baseData) {
            return []
        }

        return baseData.map(this.parseConfig);
    }

    /**
     * Парсинг конфигурации
     * @param config
     */
    private parseConfig(config: ImportSettingsData): LocationConfiguration {
        const { id, name, settings } = config;
        return {
            id: id,
            name: name,
            configuration: JSON.parse(unescape(settings))
        }
    }

    /**
     * Сериализация конфигурации
     * @param config
     */
    private serializeConfig(config: LocationConfiguration): ImportSettingsData {
        const { id, name, configuration} = config;
        return {
            id: id,
            name: name,
            settings_type: "location_import",
            settings: escape(JSON.stringify(configuration))
        } as ImportSettingsData
    }

    /**
     * Удаление конфигурации импорта
     * @param settings
     */
    async DeleteImportSettings(settings: LocationConfiguration): Promise<void> {
        await this.importSettingsBaseService.DeleteSettingsById(settings.id);
    }

    /**
     * Сохранение конфигурации импорта
     * @param settings
     */
    async StoreImportSettings(settings: LocationConfiguration): Promise<LocationConfiguration | undefined> {
        const baseData = settings.id.length > 0
            ? await this.importSettingsBaseService.UpdateSettings(this.serializeConfig(settings))
            : await this.importSettingsBaseService.CreateSettings(this.serializeConfig(settings))
        ;

        if (!baseData) {
            return;
        }

        return this.parseConfig(baseData);
    }
}