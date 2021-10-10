import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {TnvedCategory} from "./interface";

// Результат выполнения запроса
export type LoadTnvedCategoryByIdQueryResponse = {
    tnved_company_category_list: TnvedCategory[]
};

// Запрос получения списка категорий ТНВЭД по ID
export class LoadTnvedCategoryByIdQuery implements GraphQLQuery<{id: string[], companyId: number}> {
    readonly query: any;
    readonly variables: { id: string[]; companyId: number };

    constructor(id: string[], companyId: number) {
        this.variables = {id, companyId};
        this.query = gql`
            query($id:[ID!], $companyId:Int!) {
              tnved_company_category_list(where:{id:{_in:$id}, company_id:{_equals:$companyId}}, limit: 100000) {
                id
                code
                company_id
                name
              }
            }
        `;
    }
}