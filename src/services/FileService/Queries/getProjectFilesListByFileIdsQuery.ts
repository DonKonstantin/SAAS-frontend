import { gql } from "@apollo/client";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { GetProjectFilesListByFileIdsQueryParams } from "../types";

/**
 * Запрос получениясписка файлов по масиву ID
 */
class GetProjectFilesListByFileIdsQuery
  implements GraphQLQuery<GetProjectFilesListByFileIdsQueryParams> {
  readonly query: any;
  readonly variables: GetProjectFilesListByFileIdsQueryParams;

  constructor(fileIds: string[]) {
    this.variables = { fileIds };
    this.query = gql`
      query __GET_PROJECT_FILES_BY_IDS__($fileIds: [ID]) {
        result: project_file_list(where: { id: { _in: $fileIds } }) {
          composer
          duration
          file_name
          hash_sum
          id
          last_change_date
          mime_type
          origin_name
          project_id
          title
        }
      }
    `;
  }
}

export default GetProjectFilesListByFileIdsQuery;
