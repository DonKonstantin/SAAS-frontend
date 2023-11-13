import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { DeleteProjectFileByFileIdsParams } from "../types";
import { gql } from "@apollo/client";

/**
 * Delete project files by file ids mutation
 */
class DeleteProjectFileByFileIds implements GraphQLQuery<DeleteProjectFileByFileIdsParams> {
  readonly query: any;
  readonly variables: DeleteProjectFileByFileIdsParams;

  constructor(ids: string[]) {
    this.variables = { ids };
    this.query = gql`
      mutation __DELETE_PROJECT_FILES_BY_FILE_IDS__($ids: [ID]) {
        project_file_delete(where: { id: { _in: $ids } }) {
          affected_rows
        }
      }
    `;
  };
};

export default DeleteProjectFileByFileIds;