import {TnvedTaskServiceInterface} from "./interface";
import {TnvedTaskService} from "./TnvedTaskService";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";

// Фабрика сервиса
export const tnvedTaskService: {(): TnvedTaskServiceInterface} = () => {
    return new TnvedTaskService(
        graphQLClient(),
        loggerFactory(),
    );
};