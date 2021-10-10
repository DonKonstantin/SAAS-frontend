import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {TnvedCategory} from "./interface";

// Результат выполнения запроса
export type SearchTnvedCategoryByCodeQueryResponse = {
    tnved_company_category_list: TnvedCategory[]
};

// Запрос поиска категорий ТНВЭД по символьному коду
export class SearchTnvedCategoryByCodeQuery implements GraphQLQuery<{code: string[], companyId: number}> {
    readonly query: any;
    readonly variables: {code: string[], companyId: number};

    constructor(code: string[], companyId: number) {
        this.variables = {code, companyId};
        this.query = gql`
            query($code: [String!]!, $companyId:Int!) {
              tnved_company_category_list(where:{code:{_in: $code}, company_id:{_equals:$companyId}}, limit: 1000000) {
                id
                code
                company_id
                name
              }
            }
        `;
    }
}