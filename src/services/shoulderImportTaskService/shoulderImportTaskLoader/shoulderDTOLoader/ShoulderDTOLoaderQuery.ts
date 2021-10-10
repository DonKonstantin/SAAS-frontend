import {GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import {ShoulderDTO} from "./interface";
import gql from "graphql-tag";

// Результат выполнения запроса поиска плеч
export type ShoulderDTOLoaderQueryResponse = {
    result: ShoulderDTO[]
};

// Запрос поиска плеч в импорте по переданным ID
export class ShoulderDTOLoaderQuery implements GraphQLQuery<{taskId: string}> {
    readonly query: any;
    readonly variables: { taskId: string };

    constructor(taskId: string) {
        this.variables = {taskId};
        this.query = gql`
            query($taskId:ID) {
              result: import_transport_shoulder_list(
                where:{import_task_id:{_equals:$taskId}}
                limit: 10000000
              ){
                import_id
                id
                shoulder_type
                from_location_ids
                to_location_ids
                from_terminal_ids
                to_terminal_ids
                contractor_id
                carrier_id
                distance
                distance_unit
                shoulder_steps
                is_processed
                error
              }
            }
        `;
    }
}