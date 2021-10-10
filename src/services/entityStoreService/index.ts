import {EntityStoreServiceInterface} from "./interfaces";
import {EntityStoreService} from "./EntityStoreService";

// Фабрика сервиса
export const entityStoreService: {(): EntityStoreServiceInterface} = () => {
    return new EntityStoreService()
}