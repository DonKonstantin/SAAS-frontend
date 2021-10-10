import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Переменные запроса
export type PhoneticSearchQueryVariables = {
    entityType: string[]
    searchPhrase: string
}

// Результат выполнения запроса поиска
export type PhoneticSearchQueryResponse = {
    result: {
        entityId: string
        entityType: string
    }[]
};

// Поисковый запрос для поиска сущностей с использованием фонетического запроса
export class PhoneticSearchQuery implements GraphQLQuery<PhoneticSearchQueryVariables> {
    readonly query: any;
    readonly variables: PhoneticSearchQueryVariables;

    constructor(variables: Partial<PhoneticSearchQueryVariables>) {
        const {
            entityType = [],
            searchPhrase = "",
        } = variables;

        this.variables = {entityType, searchPhrase};
        this.query = gql`
            query($searchPhrase: String!, $entityType: [String]) {
              result: phoneticSearchLocalizedEntities(
                searchPhrase:$searchPhrase,
                entityType:$entityType
              ) {
                entityId
                entityType
              }
            }
        `
    }
}