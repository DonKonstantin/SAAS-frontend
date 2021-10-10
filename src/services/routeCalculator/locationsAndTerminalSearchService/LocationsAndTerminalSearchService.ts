import {LocationsAndTerminalSearchServiceInterface, SearchResult} from "./types";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {graphQLClient} from "../../graphQLClient";
import {
    LocationsAndTerminalSearchQuery,
    LocationsAndTerminalSearchQueryResult
} from "./LocationsAndTerminalSearchQuery";

/**
 * Сервис поиска локаций и терминалов по строке поискового запроса
 */
export class LocationsAndTerminalSearchService implements LocationsAndTerminalSearchServiceInterface {
    private readonly client: GraphQLClient;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    /**
     * Поиск локаций и терминалов по части названия
     * @param searchString
     */
    async SearchLocationsAndTerminals(searchString: string): Promise<SearchResult[]> {
        try {
            const resp = await this.client.Query<null, LocationsAndTerminalSearchQueryResult>(new LocationsAndTerminalSearchQuery(searchString), {});
            return resp.searchLocationsAndTerminals.map(value => {
                return {
                    id: value.entityId,
                    type: value.entityType === "Location" ? "location" : "terminal",
                } as SearchResult
            })
        } catch {
            return []
        }
    }
}