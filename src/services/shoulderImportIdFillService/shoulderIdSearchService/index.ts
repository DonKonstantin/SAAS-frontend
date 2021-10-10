import {ShoulderIdSearchServiceInterface} from "./interface";
import {graphQLClient} from "../../graphQLClient";
import {loggerFactory} from "../../logger";
import {ShoulderIdSearchService} from "./ShoulderIdSearchService";

// Фабрика сервиса
export const shoulderIdSearchService: {():ShoulderIdSearchServiceInterface} = () => {
    return new ShoulderIdSearchService(
        graphQLClient(),
        loggerFactory(),
    )
};