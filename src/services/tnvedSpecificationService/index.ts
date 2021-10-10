import {TnvedSpecificationServiceInterface} from "./interface";
import {TnvedSpecificationService} from "./TnvedSpecificationService";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";

// Фабрика сервиса
export const tnvedSpecificationService: {(): TnvedSpecificationServiceInterface} = () => {
    return new TnvedSpecificationService(
        graphQLClient(),
        loggerFactory(),
    );
};