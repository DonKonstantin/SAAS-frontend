import {GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения запроса загрузки надбавок
export type ShoulderAllowancesLoaderQueryResponse = {
    result: {
        import_id: string
        id: string | null
        allowance_id: string
        is_invoice_allowance: boolean
        offer_conditions: string[]
    }[]
};

// Запрос загрузки надбавок по переданным параметрам
export class ShoulderAllowancesLoaderQuery implements GraphQLQuery<{ids: string[]}> {
    readonly query: any;
    readonly variables: { ids: string[] };

    constructor(ids: string[]) {
        this.variables = {ids};
        this.query = gql`
            query($ids:[ID]) {
              result: import_transport_allowance_offer_list(
                where:{import_id:{_in:$ids}}
                limit: ${ids.length}
              ) {
                import_id
                id
                allowance_id
                is_invoice_allowance
                offer_conditions
              }
            }
        `
    }
}