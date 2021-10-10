import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Запрос загрузки данных заказа
export class PreOrderBaseDataLoaderProcessorQuery implements GraphQLQuery<{id: string}> {
    readonly query: any;
    readonly variables: { id: string };

    constructor(id: string) {
        this.variables = {id: id};
        this.query = gql`
            query($id:ID) {
              data: pre_order_list(where:{id:{_equals: $id}}) {
                id
                currency_id
                currency_rate
                currency_nominal
                date
                language_id
                order_price
              }
            }
        `
    }
}