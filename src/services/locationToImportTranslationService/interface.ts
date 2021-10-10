import {LocationToImport} from "../locationsParsingService/types";
import {Language} from "../../reduxStore/stores/Languages";
import {Subscribable} from "rxjs";

// Результат перевода
export type TranslationResult = {
    translate: {(): Promise<LocationToImport[]>},
    status: Subscribable<{status: number, total: number}>
}

/**
 * Сервис перевода для локаций для импорта
 */
export interface LocationToImportTranslationServiceInterface {
    /**
     * Перевод полей переданных локаций на переданные языки
     * @param locations
     * @param sourceLanguage
     * @param languages
     */
    TranslateLocations(locations: LocationToImport[], sourceLanguage: Language, languages: Language[]): TranslationResult
}