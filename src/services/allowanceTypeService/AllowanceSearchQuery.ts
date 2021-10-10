import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения основного поискового запроса
export interface AllowanceSearchQueryResponse {
    searchLocalizedEntities: {
        entityId: string
        entityType: string
    }[]
}

/**
 * Основной запрос поиска сущностей
 */
export class AllowanceSearchQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(searchString: string) {
        this.variables = null

        this.query = gql`query __SEARCH__ {
            searchLocalizedEntities(searchPhrase: "${searchString.replace(`"`, '\"')}", entityType: ["TransportAllowance"]){
                entityId,
                entityType
            }
        }`
    }
}