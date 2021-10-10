import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения основного поискового запроса
export interface RelationSearchQueryResponse {
    searchLocalizedEntities: {
        entityId: string
        entityType: string
    }[]
}

/**
 * Основной запрос поиска сущностей
 */
export class RelationSearchQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(searchString: string, entityTypes: string[]) {
        this.variables = null;

        const types = entityTypes.map(t => `"${t}"`);
        this.query = gql`query __SEARCH__ {
            searchLocalizedEntities(searchPhrase: "${searchString}", entityType: [${types.join(",")}]){
                entityId,
                entityType
            }
        }`
    }
}