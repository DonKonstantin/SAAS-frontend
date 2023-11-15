import { gql } from "@apollo/client";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { GetProjectFilesListByProjectIdQueryParams } from "../types";

/**
 * Get project files by project id query
 */
class GetProjectFilesListByProjectIdQuery
  implements GraphQLQuery<GetProjectFilesListByProjectIdQueryParams> {
  readonly query: any;
  readonly variables: GetProjectFilesListByProjectIdQueryParams;

  constructor(
    projectId: string,
    limit: number,
    offset: number,
    order: any,
  ) {
    this.variables = {
      projectId,
      limit,
      offset,
      order,
    };
    this.query = gql`
      query __GET_PROJECT_FILES_BY_PROJECT_ID__(
        $projectId: ID,
        $limit: Int,
        $offset: Int,
        $order: [project_file_order_parameters_object],
      ) {
        result: project_file_list(
          where: { project_id: { _equals: $projectId } },
          limit: $limit,
          offset: $offset,
          order: $order,
        ) {
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
  };
};

export default GetProjectFilesListByProjectIdQuery;
