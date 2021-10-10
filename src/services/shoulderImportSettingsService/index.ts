import {ShoulderImportTaskServiceInterface} from "./interfaces";
import {ShoulderImportTaskService} from "./ShoulderImportTaskService";
import {importSettingsBaseService} from "../locationsImportSettingsService/importSettingsBaseService";

// Конструктор сервиса
export const shoulderImportTaskService: {(): ShoulderImportTaskServiceInterface} = () => {
    return new ShoulderImportTaskService(
        importSettingsBaseService(),
    );
};