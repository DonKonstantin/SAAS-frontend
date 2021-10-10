import {ShoulderStepLoaderInterface} from "./interface";
import {ShoulderStepLoader} from "./ShoulderStepLoader";
import {graphQLClient} from "../../../graphQLClient";
import {loggerFactory} from "../../../logger";

// Фабрика сервиса
export const shoulderStepLoader: {(token?: string): ShoulderStepLoaderInterface} = token => {
    return new ShoulderStepLoader(
        graphQLClient(token),
        loggerFactory(),
    )
};