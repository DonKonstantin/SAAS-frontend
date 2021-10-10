import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {TnvedCategory} from "./interface";
import gql from "graphql-tag";

// Результат выполнения запроса
export type UpdateCategoryQueryResponse = {
    tnved_company_category_update: {
        returning: TnvedCategory[]
    }
};

// Запрос обновления категории
export class UpdateCategoryQuery implements GraphQLQuery<{category: Partial<TnvedCategory>, id: string}> {
    readonly query: any;
    readonly variables: {category: Partial<TnvedCategory>, id: string};

    constructor(category: TnvedCategory) {
        this.variables = {
            category: {...category, id: undefined},
            id: category.id,
        };

        this.query = gql`
            mutation($category:tnved_company_category_update_set_type, $id:ID!) {
              tnved_company_category_update(set: $category, where:{id:{_equals:$id}}) {
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