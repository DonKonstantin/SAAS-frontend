import {LocationsSearchServiceInterface} from "./interface";
import {LocationsSearchService} from "./LocationsSearchService";
import {graphQLClient} from "../../graphQLClient";
import {loggerFactory} from "../../logger";

// Фабрика сервиса
export const locationsSearchService: {(token?: string): LocationsSearchServiceInterface} = token => {
    return new LocationsSearchService(
        graphQLClient(token),
        loggerFactory(),
    )
};
