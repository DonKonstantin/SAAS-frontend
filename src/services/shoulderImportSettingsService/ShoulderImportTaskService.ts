import {ShoulderImportTaskServiceInterface, StoredImportShoulderConfiguration} from "./interfaces";
import {
    ImportSettingsBaseServiceInterface,
    ImportSettingsData
} from "../locationsImportSettingsService/importSettingsBaseService/interfaces";
import {escape, unescape} from "html-escaper";

/**
 * Интерфейс сервиса для работы с конфигурацией импорта
 */
export class ShoulderImportTaskService implements ShoulderImportTaskServiceInterface {

    private readonly importSettingsBaseService: ImportSettingsBaseServiceInterface;

    /**
     * Конструктор сервиса
     * @param importSettingsBaseService
     */
    constructor(importSettingsBaseService: ImportSettingsBaseServiceInterface) {
        this.importSettingsBaseService = importSettingsBaseService;
    }

    /**
     * Получение доступных конфигураций
     */
    async GetSettings(): Promise<StoredImportShoulderConfiguration[]> {
        const baseData = await this
            .importSettingsBaseService
            .LoadSettings("shoulders_import")
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
    private parseConfig(config: ImportSettingsData): StoredImportShoulderConfiguration {
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
    private serializeConfig(config: StoredImportShoulderConfiguration): ImportSettingsData {
        const { id, name, configuration} = config;
        return {
            id: id,
            name: name,
            settings_type: "shoulders_import",
            settings: escape(JSON.stringify(configuration))
        } as ImportSettingsData
    }

    /**
     * Сохранение конфигурации
     * @param settings
     */
    async StoreSettings(settings: StoredImportShoulderConfiguration): Promise<StoredImportShoulderConfiguration | undefined> {
        const baseData = settings.id.length > 0
            ? await this.importSettingsBaseService.UpdateSettings(this.serializeConfig(settings))
            : await this.importSettingsBaseService.CreateSettings(this.serializeConfig(settings))
        ;

        if (!baseData) {
            return;
        }

        return this.parseConfig(baseData);
    }

    /**
     * Удаление конфигурации
     * @param settings
     */
    async DeleteSettings(settings: StoredImportShoulderConfiguration): Promise<void> {
        await this.importSettingsBaseService.DeleteSettingsById(settings.id);
    }
}