import {TnvedCategoryServiceInterface} from "./interface";
import {TnvedCategoryService} from "./TnvedCategoryService";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";

// Фабрика сервиса
export const tnvedCategoryService: {(): TnvedCategoryServiceInterface} = () => {
    return new TnvedCategoryService(
        graphQLClient(),
        loggerFactory(),
    )
};