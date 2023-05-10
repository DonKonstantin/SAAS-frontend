import { DocumentNode, gql } from "@apollo/client";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { GetProjectsByIdsQueryRequest } from "../types";

/**
 * Запрос списка проектов по их ID
 */
class GetProjectsByIdsQuery
  implements GraphQLQuery<GetProjectsByIdsQueryRequest>
{
  readonly query: DocumentNode;
  readonly variables: GetProjectsByIdsQueryRequest;

  constructor(projectIds: string[]) {
    this.variables = {
      projectIds,
    };

    this.query = gql`
      query __PROJECT_LIST_BY_IDS__($projectIds: [ID]) {
        projects: project_list(where: { id: { _in: $projectIds } }) {
          id
          name
          active
          parent
        }
      }
    `;
  }
}

export default GetProjectsByIdsQuery;
