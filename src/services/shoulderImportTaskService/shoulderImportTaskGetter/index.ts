import {ShoulderImportTaskGetterInterface} from "./interface";
import {ShoulderImportTaskGetter} from "./ShoulderImportTaskGetter";
import {graphQLClient} from "../../graphQLClient";
import {loggerFactory} from "../../logger";

// Фабрика сервиса
export const shoulderImportTaskGetter: {(token?: string): ShoulderImportTaskGetterInterface} = token => {
    return new ShoulderImportTaskGetter(
        graphQLClient(token),
        loggerFactory(),
    );
};