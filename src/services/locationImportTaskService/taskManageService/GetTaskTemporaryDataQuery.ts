import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Результат выполнения запроса
export type GetTaskTemporaryDataQueryResponse = {
    loadTemporaryData: {data: string}
};

// Запрос загрузки временных данных для задания импорта
export class GetTaskTemporaryDataQuery implements GraphQLQuery<{id: string}> {
    readonly query: any;
    readonly variables: { id: string };

    constructor(taskId: string) {
        this.variables = {id: taskId};
        this.query = gql`
            query($id: ID!) {
              loadTemporaryData(task:$id) {
                data
              }
            }
        `;
    }
}