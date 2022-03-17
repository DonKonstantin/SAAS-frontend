import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

export type DeleteFilesByIdMutationParams = {
    ids: string[]
}

export type DeleteFilesByIdMutationResponse = {
    file_delete: {
        affected_rows : number
    }
}

export class DeleteFilesByIdMutation implements GraphQLQuery<DeleteFilesByIdMutationParams> {
    readonly query: any;
    readonly variables: DeleteFilesByIdMutationParams;

    constructor(ids: string[]) {
        this.variables = {
            ids
        }

        this.query = gql(`
        mutation __DELETE_FILE__($ids: [ID]) {
          file_data_delete (where: {
            id: {
                _in: $ids
            }
          }) {
            affected_rows
          }
        }`
        )
    }
}
