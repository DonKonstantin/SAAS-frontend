import {ShoulderOfferLoaderInterface} from "./interface";
import {ShoulderOfferLoader} from "./ShoulderOfferLoader";
import {graphQLClient} from "../../../graphQLClient";
import {loggerFactory} from "../../../logger";
import {shoulderOfferConditionsLoader} from "../shoulderOfferConditionsLoader";
import {shoulderAllowancesLoader} from "../shoulderAllowancesLoader";

// Фабрика сервиса
export const shoulderOfferLoader: {(token?: string): ShoulderOfferLoaderInterface} = token => {
    return new ShoulderOfferLoader(
        graphQLClient(token),
        loggerFactory(),
        shoulderOfferConditionsLoader(token),
        shoulderAllowancesLoader(token),
    )
};