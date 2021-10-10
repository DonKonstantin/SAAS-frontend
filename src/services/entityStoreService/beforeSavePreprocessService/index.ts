import {BeforeSavePreprocessServiceInterface} from "./interfaces";
import {BeforeSavePreprocessService} from "./BeforeSavePreprocessService";

// Фабрика сервиса
export const beforeSavePreprocessService: {(): BeforeSavePreprocessServiceInterface} = () => {
    return new BeforeSavePreprocessService()
}