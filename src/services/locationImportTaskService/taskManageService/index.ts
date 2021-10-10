import {TaskManageServiceInterface} from "./interface";
import {TaskManageService} from "./TaskManageService";
import {graphQLClient} from "../../graphQLClient";
import {loggerFactory} from "../../logger";

// Фабрика сервиса
export const taskManageService: {(): TaskManageServiceInterface} = () => {
    return new TaskManageService(
        graphQLClient(),
        loggerFactory(),
    );
};