import {LocationImportTaskServiceInterface} from "./interface";
import {LocationImportTaskService} from "./LocationImportTaskService";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";
import {taskManageService} from "./taskManageService";

// Фабрика сервиса
export const locationImportTaskService: {(): LocationImportTaskServiceInterface} = () => {
    return new LocationImportTaskService(
        graphQLClient(),
        loggerFactory(),
        taskManageService(),
    );
};