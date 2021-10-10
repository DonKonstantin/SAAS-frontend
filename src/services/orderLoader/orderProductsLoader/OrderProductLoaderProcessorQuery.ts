import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Запрос загрузки товаров заказов
export class OrderProductLoaderProcessorQuery implements GraphQLQuery<{id: string}> {
    readonly query: any;
    readonly variables: { id: string };

    constructor(id: string) {
        this.variables = {id: id};
        this.query = gql`
            query($id:ID) {
              data: order_product_list(where:{order_id:{_equals: $id}}, order:[{by: id}]) {
                id
                amount
                price
                product_type
                data
              }
            }
        `
    }
}