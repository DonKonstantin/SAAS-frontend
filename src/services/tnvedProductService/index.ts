import {TnvedProductServiceInterface} from "./interface";
import {TnvedProductService} from "./TnvedProductService";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";

// Фабрика сервиса
export const tnvedProductService: {(): TnvedProductServiceInterface} = () => {
    return new TnvedProductService(
        graphQLClient(),
        loggerFactory(),
    )
};