import {ShoulderImportTaskCreateServiceInterface} from "./interface";
import {ShoulderImportTaskCreateService} from "./ShoulderImportTaskCreateService";
import {graphQLClient} from "../../graphQLClient";
import {loggerFactory} from "../../logger";

// Фабрика сервиса
export const shoulderImportTaskCreateService: {(): ShoulderImportTaskCreateServiceInterface} = () => {
    return new ShoulderImportTaskCreateService(
        graphQLClient(),
        loggerFactory(),
    )
};