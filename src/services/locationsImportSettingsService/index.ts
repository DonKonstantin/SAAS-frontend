import {LocationsImportSettingsServiceInterface} from "./interface";
import {LocationsImportSettingsService} from "./LocationsImportSettingsService";
import {importSettingsBaseService} from "./importSettingsBaseService";

// Конструктор сервиса
export const locationsImportSettingsService: {(): LocationsImportSettingsServiceInterface} = () => {
    return new LocationsImportSettingsService(
        importSettingsBaseService(),
    );
};