import {TnvedProductsToImportServiceInterface} from "./interface";
import {TnvedProductsToImportService} from "./TnvedProductsToImportService";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";
import {tnvedProductService} from "../tnvedProductService";

// Конструктор сервиса
export const tnvedProductsToImportService: {(): TnvedProductsToImportServiceInterface} = () => {
    return new TnvedProductsToImportService(
        graphQLClient(),
        loggerFactory(),
        tnvedProductService(),
    )
};