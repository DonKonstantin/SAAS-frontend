import {CreateEntityServiceInterface} from "./interfaces";
import {CreateEntityService} from "./CreateEntityService";

// Фабрика сервиса
export const createEntityService: {(): CreateEntityServiceInterface} = () => {
    return new CreateEntityService()
}