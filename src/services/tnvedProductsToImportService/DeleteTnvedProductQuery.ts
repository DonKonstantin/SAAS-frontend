import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Запрос удаления товара ТНВЭД
export class DeleteTnvedProductQuery implements GraphQLQuery<{taskId: string, productImportId: string}> {
    readonly query: any;
    readonly variables: { taskId: string; productImportId: string };

    constructor(taskId: string, productImportId: string) {
        this.variables = {taskId, productImportId};
        this.query = gql`
            mutation($taskId: ID!, $productImportId: ID!) {
              dropTnvedProductFromTask(task:$taskId, productImportId:$productImportId)
            }
        `
    }
}