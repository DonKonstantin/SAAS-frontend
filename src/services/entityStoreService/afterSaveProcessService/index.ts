import {AfterSaveProcessServiceInterface} from "./interfaces";
import {AfterSaveProcessService} from "./AfterSaveProcessService";

// Фабрика сервиса
export const afterSaveProcessService: {(): AfterSaveProcessServiceInterface} = () => {
    return new AfterSaveProcessService()
}