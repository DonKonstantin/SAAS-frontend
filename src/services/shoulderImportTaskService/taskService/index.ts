import {ShoulderImportTaskService} from "./ShoulderImportTaskService";
import {shoulderImportTaskCreateService} from "../shoulderImportTaskCreateService";
import {shoulderImportTaskGetter} from "../shoulderImportTaskGetter";
import {shoulderImportTaskLoader} from "../shoulderImportTaskLoader";
import {taskManageService} from "../../locationImportTaskService/taskManageService";
import {ShoulderImportTaskServiceInterface} from "./interface";

// Конструктор сервиса
export const shoulderTaskService: {(token?: string): ShoulderImportTaskServiceInterface} = token => {
    return new ShoulderImportTaskService(
        shoulderImportTaskCreateService(),
        shoulderImportTaskGetter(token),
        shoulderImportTaskLoader(token),
        taskManageService(),
    );
};