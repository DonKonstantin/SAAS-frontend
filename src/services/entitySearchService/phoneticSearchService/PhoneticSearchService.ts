import {PhoneticSearchServiceInterface, SearchResult} from "./interface";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {graphQLClient} from "../../graphQLClient";
import {Logger} from "../../logger/Logger";
import {loggerFactory} from "../../logger";
import {PhoneticSearchQuery, PhoneticSearchQueryResponse, PhoneticSearchQueryVariables} from "./PhoneticSearchQuery";

/**
 * Сервис фонетического поиска сущностей
 */
export class PhoneticSearchService implements PhoneticSearchServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token);
        this.logger = loggerFactory().make("PhoneticSearchService");
    }

    /**
     * Фонетический поиск сущностей по переданному названию и коду
     * @param searchPhrase
     * @param entityTypes
     */
    async search(searchPhrase: string, entityTypes?: string[]): Promise<SearchResult[]> {
        if (0 === searchPhrase.length) {
            return []
        }

        const query = new PhoneticSearchQuery({
            entityType: entityTypes,
            searchPhrase,
        });

        try {
            const response = await this.client.Query<
                PhoneticSearchQueryVariables,
                PhoneticSearchQueryResponse
            >(query, {});
            this.logger.Debug(`Loaded response`, response);

            return response.result;
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            return [];
        }
    }
}