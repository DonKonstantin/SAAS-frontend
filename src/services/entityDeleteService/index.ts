import {EntityDeleteServiceInterface} from "./interfaces";
import {EntityDeleteService} from "./EntityDeleteService";
import {loggerFactory} from "../logger";
import {schemaValueConverter} from "../schemaValueConverter";
import {graphQLClient} from "../graphQLClient";

// Фабрика сервиса
export const entityDeleteService: {(): EntityDeleteServiceInterface} = () => {
    return new EntityDeleteService(
        loggerFactory(),
        schemaValueConverter(),
        graphQLClient(),
    )
}