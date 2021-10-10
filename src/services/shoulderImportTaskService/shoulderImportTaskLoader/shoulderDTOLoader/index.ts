import {ShoulderDTOLoaderInterface} from "./interface";
import {ShoulderDTOLoader} from "./ShoulderDTOLoader";
import {graphQLClient} from "../../../graphQLClient";
import {loggerFactory} from "../../../logger";

// Фабрика сервиса
export const shoulderDTOLoader: {(token?: string): ShoulderDTOLoaderInterface} = token => {
    return new ShoulderDTOLoader(
        graphQLClient(token),
        loggerFactory(),
    );
};