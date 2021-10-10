import {ShoulderImportTaskCreateServiceInterface} from "../shoulderImportTaskCreateService/interface";
import {ShoulderImportTaskGetterInterface} from "../shoulderImportTaskGetter/interface";
import {TaskManageServiceInterface} from "../../locationImportTaskService/taskManageService/interface";
import {ShoulderImportTaskLoaderInterface} from "../shoulderImportTaskLoader/interface";

/**
 * Сервис для управления заданиями импорта ставок
 */
export interface ShoulderImportTaskServiceInterface extends
    ShoulderImportTaskCreateServiceInterface,
    ShoulderImportTaskGetterInterface,
    TaskManageServiceInterface,
    ShoulderImportTaskLoaderInterface
{

}