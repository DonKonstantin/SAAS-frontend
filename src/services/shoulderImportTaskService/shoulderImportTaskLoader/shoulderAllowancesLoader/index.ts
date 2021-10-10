import {ShoulderAllowancesLoaderInterface} from "./interface";
import {ShoulderAllowancesLoader} from "./ShoulderAllowancesLoader";
import {graphQLClient} from "../../../graphQLClient";
import {loggerFactory} from "../../../logger";
import {shoulderOfferConditionsLoader} from "../shoulderOfferConditionsLoader";

// Фабрика сервиса
export const shoulderAllowancesLoader: {(token?: string): ShoulderAllowancesLoaderInterface} = token => {
    return new ShoulderAllowancesLoader(
        graphQLClient(token),
        loggerFactory(),
        shoulderOfferConditionsLoader(token),
    );
};