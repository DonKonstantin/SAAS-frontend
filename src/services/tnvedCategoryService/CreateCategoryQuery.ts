import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {TnvedCategory} from "./interface";
import gql from "graphql-tag";

// Результат выполнения запроса
export type CreateCategoryQueryResponse = {
    tnved_company_category_insert: {
        returning: TnvedCategory[]
    }
};

// Запрос создания категории
export class CreateCategoryQuery implements GraphQLQuery<{category: Partial<TnvedCategory>}> {
    readonly query: any;
    readonly variables: { category: Partial<TnvedCategory> };

    constructor(category: TnvedCategory) {
        this.variables = {category: {...category, id: undefined}};
        this.query = gql`
            mutation($category:tnved_company_category_insert_object_type) {
              tnved_company_category_insert(objects: [$category]) {
                returning {
                  id
                  code
                  company_id
                  name
                }
              }
            }
        `;
    }
}