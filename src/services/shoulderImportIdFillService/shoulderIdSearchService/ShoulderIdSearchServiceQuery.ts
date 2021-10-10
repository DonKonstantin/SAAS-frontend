import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Переменные запроса
export type Vars = {
    shoulder_type: string,
    carrier_id: string,
    contractor_id: string,
}

// Результат выполнения запроса
export type ShoulderIdSearchServiceQueryResponse = {
    result: {
        id: string
        from_location_ids: string[]
        from_terminal_ids: string[]
        to_location_ids: string[]
        to_terminal_ids: string[]
    }[]
};

// Запрос поиска плеч по переданным параметрам
export class ShoulderIdSearchServiceQuery implements GraphQLQuery<Vars> {
    readonly query: any;
    readonly variables: Vars;

    constructor(variables: Vars) {
        this.variables = variables;
        this.query = gql`
            query(
              $shoulder_type:ID!,
              $carrier_id:ID!,
              $contractor_id:ID!,
            ) {
              result: transport_shoulder_list(
                limit:100000
                where:{
                  shoulder_type:{_equals:$shoulder_type}
                  carrier_id:{_equals:$carrier_id}
                  contractor_id:{_equals:$contractor_id}
                }
              ) {
                id
                from_location_ids
                from_terminal_ids
                to_location_ids
                to_terminal_ids
              }
            }
        `
    }
}