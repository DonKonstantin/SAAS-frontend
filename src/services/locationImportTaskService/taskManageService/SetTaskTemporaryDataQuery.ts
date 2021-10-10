import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Запрос установки временных данных для задания импорта
export class SetTaskTemporaryDataQuery implements GraphQLQuery<{id: string, data: string}> {
    readonly query: any;
    readonly variables: { id: string; data: string };

    constructor(taskId: string, data: string) {
        this.variables = {id: taskId, data};
        this.query = gql`
            mutation($id: ID!, $data: String!) {
              storeTemporaryData(task:$id, data:$data)
            }
        `;
    }
}