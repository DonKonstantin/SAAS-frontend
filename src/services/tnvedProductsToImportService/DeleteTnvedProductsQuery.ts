import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Удаление товаров по переданной задаче импорта
export class DeleteTnvedProductsQuery implements GraphQLQuery<{taskId: string}> {
    readonly query: any;
    readonly variables: { taskId: string };

    constructor(taskId: string) {
        this.variables = {taskId};
        this.query = gql`
            mutation($taskId: ID!) {
              dropTnvedProductsFromTask(task:$taskId)
            }
        `;
    }
}