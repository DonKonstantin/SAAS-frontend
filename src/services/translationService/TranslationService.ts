import {Translation, TranslationServiceInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {TranslationServiceQuery, TranslationServiceQueryResponse} from "./TranslationServiceQuery";

/**
 * Перевод переданного текста на указанные языки
 */
export class TranslationService implements TranslationServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`LocationsSearchService`);
    }

    /**
     * Перевод переданных текстов
     *
     * @param text
     * @param sourceLang
     * @param languages
     */
    async Translate(text: string, sourceLang: string, languages: string[]): Promise<Translation[]> {
        try {
            if (0 === languages.length) {
                return [];
            }

            const realLanguages = languages.filter(l => l !== sourceLang);
            const result: Translation[] = languages.indexOf(sourceLang) !== -1 ? [{languageId: sourceLang, translation: text}] : [];

            const resp = await this.client.Query<null, TranslationServiceQueryResponse>(
                new TranslationServiceQuery(text, sourceLang, realLanguages),
                {}
            );
            this.logger.Debug(`Loaded translations`, resp.result);

            return [...result, ...resp.result]
        } catch(e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }
}