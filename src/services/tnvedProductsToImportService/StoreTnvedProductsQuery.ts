import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {TnvedProductToImport} from "./interface";
import gql from "graphql-tag";

// Запрос добавления товаров ТНВЭД к заданию импорта
export class StoreTnvedProductsQuery implements GraphQLQuery<{task: string, products: Partial<TnvedProductToImport>[]}> {
    readonly query: any;
    readonly variables: { task: string; products: Partial<TnvedProductToImport>[] };

    constructor(task: string, products: TnvedProductToImport[]) {
        const productsToVariables = products.map(product => {
            return {
                id: product.id,
                sku: product.sku,
                name: product.name,
                category_id: product.category_id,
                company_id: product.company_id,
                tnved_code: product.tnved_code,
            }
        });

        this.variables = {task, products: productsToVariables};
        this.query = gql`
            mutation($task:ID!, $products: [Tnved_Company_Product_To_Import_Input!]!) {
              addTnvedProductsToTask(task: $task, products:$products)
            }
        `;
    }
}