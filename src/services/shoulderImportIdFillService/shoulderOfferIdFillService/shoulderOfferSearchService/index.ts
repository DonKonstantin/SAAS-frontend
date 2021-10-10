import {ShoulderOfferSearchServiceInterface} from "./interface";
import {ShoulderOfferSearchService} from "./ShoulderOfferSearchService";
import {graphQLClient} from "../../../graphQLClient";
import {loggerFactory} from "../../../logger";

// Фабрика сервиса
export const shoulderOfferSearchService: {():ShoulderOfferSearchServiceInterface} = () => {
    return new ShoulderOfferSearchService(
        graphQLClient(),
        loggerFactory(),
    )
};