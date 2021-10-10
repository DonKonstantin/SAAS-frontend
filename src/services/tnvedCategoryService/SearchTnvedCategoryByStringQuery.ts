import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения запроса
export type SearchTnvedCategoryByStringQueryResponse = {
    searchLocalizedEntities: {entityId: string}[]
};

// Запрос поиска сущностей категорий ТНВЭД по поисковой строке
export class SearchTnvedCategoryByStringQuery implements GraphQLQuery<{searchString: string}> {
    readonly query: any;
    readonly variables: { searchString: string };

    constructor(searchString: string) {
        this.variables = {searchString};
        this.query = gql`
            query($searchString:String!) {
              searchLocalizedEntities(entityType: "TnvedCompanyCategory", searchPhrase:$searchString) {
                entityId
              }
            }
        `;
    }
}