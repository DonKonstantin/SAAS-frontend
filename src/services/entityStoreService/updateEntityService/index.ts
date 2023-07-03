import {UpdateEntityServiceInterface} from "./interfaces";
import {UpdateEntityService} from "./UpdateEntityService";

// Фабрика сервиса
export const updateEntityService: {(): UpdateEntityServiceInterface} = () => {
    return new UpdateEntityService()
}