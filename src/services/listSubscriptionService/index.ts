import {ListSubscriptionServiceInterface} from "./interfaces";
import {ListSubscriptionService} from "./listSubscriptionService";
import {queryGenerator} from "./queryGenerator";
import {loggerFactory} from "../logger";
import {graphQLClient} from "../graphQLClient";

// Фабрика сервиса
export const listSubscriptionService: {(): ListSubscriptionServiceInterface} = () => {
    return new ListSubscriptionService(
        queryGenerator(),
        loggerFactory(),
        graphQLClient(),
    )
};