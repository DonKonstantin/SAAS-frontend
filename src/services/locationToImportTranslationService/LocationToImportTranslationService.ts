import {LocationToImportTranslationServiceInterface, TranslationResult} from "./interface";
import {LocationToImport} from "../locationsParsingService/types";
import {Language} from "../../reduxStore/stores/Languages";
import {Subject} from "rxjs";
import {TranslationServiceInterface} from "../translationService/interface";
import {splitArrayToParts} from "../helpers/SplitArrayToParts";

/**
 * Сервис перевода для локаций для импорта
 */
export class LocationToImportTranslationService implements LocationToImportTranslationServiceInterface {
    private readonly translationService: TranslationServiceInterface;
    private maxConnections: number;

    /**
     * Конструктор сервиса
     * @param translationService
     * @param maxConnections
     */
    constructor(translationService: TranslationServiceInterface, maxConnections: number) {
        this.maxConnections = maxConnections;
        this.translationService = translationService;
    }

    /**
     * Перевод полей переданных локаций на переданные языки
     * @param locations
     * @param sourceLanguage
     * @param languages
     */
    TranslateLocations(locations: LocationToImport[], sourceLanguage: Language, languages: Language[]): TranslationResult {
        const subject = new Subject<{status: number, total: number}>();
        const translate = async (): Promise<LocationToImport[]> => {
            const languagesIds = languages.map(l => l.id);

            let result: LocationToImport[] = [];
            let locationPulls = splitArrayToParts(locations, this.maxConnections);

            for (let locationsPull of locationPulls) {
                const locationData = await Promise.all(locationsPull.map(async location => {
                    const locationData: LocationToImport = JSON.parse(JSON.stringify(location));
                    const localizedNames = await this.translationService.Translate(
                        locationData.default_name,
                        sourceLanguage.id,
                        languagesIds,
                    );

                    localizedNames.map(localizedName => {
                        const localizations = locationData.localized_names.filter(l => l.lang_id !== localizedName.languageId);
                        localizations.push({
                            lang_id: localizedName.languageId,
                            message: localizedName.translation,
                        });

                        locationData.localized_names = localizations;
                    });

                    return locationData;
                }));

                result.push(...locationData);
                subject.next({
                    status: result.length,
                    total: locations.length,
                })
            }

            subject.complete();
            return result
        };

        return {
            status: subject,
            translate,
        }
    }
}