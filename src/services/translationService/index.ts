import {TranslationServiceInterface} from "./interface";
import {TranslationService} from "./TranslationService";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";

// Фабрика сервиса
export const translationService: {(): TranslationServiceInterface} = () => {
    return new TranslationService(
        graphQLClient(),
        loggerFactory(),
    )
};