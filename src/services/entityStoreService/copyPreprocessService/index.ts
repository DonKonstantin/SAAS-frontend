import {CopyPreprocessServiceInterface} from "./interfaces";
import {CopyPreprocessService} from "./CopyPreprocessService";

// Фабрика сервиса
export const copyPreprocessService: {(): CopyPreprocessServiceInterface} = () => {
    return new CopyPreprocessService()
}