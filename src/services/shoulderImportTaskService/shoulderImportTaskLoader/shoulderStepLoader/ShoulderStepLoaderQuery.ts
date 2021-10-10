import {GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {ShoulderStep} from "../../shoulderTypes";

// Результат выполнения запроса загрузки шагов
export type ShoulderStepLoaderQueryResponse = {
    result: ShoulderStep[]
};

// Запрос загрузки шагов плеча
export class ShoulderStepLoaderQuery implements GraphQLQuery<{ids: string[]}> {
    readonly query: any;
    readonly variables: { ids: string[] };

    constructor(ids: string[]) {
        this.variables = {ids};
        this.query = gql`
            query($ids:[ID]) {
              result: import_transport_shoulder_step_list(
                where:{import_id:{_in:$ids}}
                limit: ${ids.length}
              ) {
                import_id
                id
                start_terminal_id
                end_terminal_id
                transport_type_id
                position
              }
            }
        `
    }
}