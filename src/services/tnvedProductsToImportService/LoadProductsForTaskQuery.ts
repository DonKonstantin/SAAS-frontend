import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {TnvedProductToImport} from "./interface";

// Результат выполнения запроса
export type LoadProductsForTaskQueryResponse = {
    tnved_company_product_to_import_list: TnvedProductToImport[]
};

// Запрос получения списка товаров ТНВЭД для импорта
export class LoadProductsForTaskQuery implements GraphQLQuery<{taskId: string}> {
    readonly query: any;
    readonly variables: { taskId: string };

    constructor(taskId: string) {
        this.variables = {taskId};
        this.query = gql`
            query($taskId: ID!) {
              tnved_company_product_to_import_list(where:{task_id:{_equals:$taskId}}, limit: 100000, order:[{by: import_id}]) {
                category_id
                company_id
                error
                id
                import_id
                is_processed
                name
                sku
                task_id
                tnved_code
              }
            }
        `;
    }
}