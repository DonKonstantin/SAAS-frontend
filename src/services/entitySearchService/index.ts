import {EntitySearchServiceInterface} from "./interface";
import {EntitySearchService} from "./EntitySearchService";
import {phoneticSearchService} from "./phoneticSearchService";
import {searchUntypedLoader} from "../searchUntypedLoader";
import {loggerFactory} from "../logger";

// Фабрика сервиса
export const entitySearchService: {(): EntitySearchServiceInterface} = () => {
    return new EntitySearchService(
        phoneticSearchService(),
        searchUntypedLoader(),
        loggerFactory().make("EntitySearchService"),
    )
};