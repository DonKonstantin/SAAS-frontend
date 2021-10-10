import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Запрос загрузки данных заказа
export class OrderBaseDataLoaderProcessorQuery implements GraphQLQuery<{id: string}> {
    readonly query: any;
    readonly variables: { id: string };

    constructor(id: string) {
        this.variables = {id: id};
        this.query = gql`
            query($id:ID) {
              data: order_list(where:{id:{_equals: $id}}) {
                id
                currency_id
                currency_rate
                currency_nominal
                customer_email
                customer_name
                customer_phone
                date
                language_id
                order_price
              }
            }
        `
    }
}