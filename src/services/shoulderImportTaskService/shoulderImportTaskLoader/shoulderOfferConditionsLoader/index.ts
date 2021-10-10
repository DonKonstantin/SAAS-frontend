import {ShoulderOfferConditionsLoaderInterface} from "./interface";
import {ShoulderOfferConditionsLoader} from "./ShoulderOfferConditionsLoader";
import {graphQLClient} from "../../../graphQLClient";
import {loggerFactory} from "../../../logger";

// Фабрика сервиса
export const shoulderOfferConditionsLoader: {(token?: string): ShoulderOfferConditionsLoaderInterface} = token => {
    return new ShoulderOfferConditionsLoader(
        graphQLClient(token),
        loggerFactory(),
    );
};