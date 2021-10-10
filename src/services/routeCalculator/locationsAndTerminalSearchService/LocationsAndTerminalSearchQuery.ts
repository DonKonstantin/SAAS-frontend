import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Найденная сущность
 */
export interface SearchEntityItem {
    entityId: string;
    entityType: string;
}

/**
 * Результат выполнения поискового запроса
 */
export interface LocationsAndTerminalSearchQueryResult {
    searchLocationsAndTerminals: SearchEntityItem[];
}

/**
 * Поисковый запрос для поиска локаций и терминалов
 */
export class LocationsAndTerminalSearchQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(searchString: string) {
        this.variables = null;
        this.query = gql`
            query SearchLocationsAndTerminals {
              searchLocationsAndTerminals(searchPhrase: "${searchString.replace(`"`, `\"`)}") {
                entityId
                entityType
              }
            }
        `
    }
}