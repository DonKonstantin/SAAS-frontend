import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {TnvedProduct} from "./interface";

// Результат выполнения запроса
export type GetProductsBySkuQueryResponse = {
    tnved_company_product_list: TnvedProduct[]
};

// Запрос получения товаров ТНВЭД по переданному списку артикулов
export class GetProductsBySkuQuery implements GraphQLQuery<{ sku: string[], companyId: number }> {
    readonly query: any;
    readonly variables: { sku: string[]; companyId: number };

    constructor(sku: string[], companyId: number) {
        this.variables = {sku, companyId};
        this.query = gql`
            query($sku:[String!], $companyId:Int!) {
              tnved_company_product_list(where:{company_id:{_equals:$companyId}, sku:{_in:$sku}}, limit: 100000) {
                category_id
                company_id
                id
                name
                sku
                tnved_code
              }
            }
        `
    }
}
