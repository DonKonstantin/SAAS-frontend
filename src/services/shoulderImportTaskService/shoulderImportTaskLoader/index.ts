import {ShoulderImportTaskLoaderInterface} from "./interface";
import {ShoulderImportTaskLoader} from "./ShoulderImportTaskLoader";
import {shoulderDTOLoader} from "./shoulderDTOLoader";
import {shoulderStepLoader} from "./shoulderStepLoader";
import {shoulderOfferLoader} from "./shoulderOfferLoader";

// Фабрика сервиса
export const shoulderImportTaskLoader: {(token?: string): ShoulderImportTaskLoaderInterface} = token => {
    return new ShoulderImportTaskLoader(
        shoulderDTOLoader(token),
        shoulderStepLoader(token),
        shoulderOfferLoader(token),
    );
};