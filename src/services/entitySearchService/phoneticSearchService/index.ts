import {PhoneticSearchServiceInterface} from "./interface";
import {PhoneticSearchService} from "./PhoneticSearchService";

// Фабрика сервиса
export const phoneticSearchService: {(token?: string): PhoneticSearchServiceInterface} = token => {
    return new PhoneticSearchService(token)
};