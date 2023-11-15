import { gql } from "@apollo/client";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { ProjectFilesListByProjectIdAggregateQueryParams } from "../types";

/**
 * Aggregate project files by project id query
 */
class GetProjectFilesListByProjectIdAggregateQuery
  implements GraphQLQuery<ProjectFilesListByProjectIdAggregateQueryParams> {
  readonly query: any;
  readonly variables: ProjectFilesListByProjectIdAggregateQueryParams;

  constructor( projectId: string ) {
    this.variables = { projectId };
    this.query = gql`
      query __GET_PROJECT_FILES_BY_PROJECT_ID_AGGREGATION__($projectId: ID) {
        result: project_file_aggregate(where: { project_id: { _equals: $projectId } }) {
          count
        }
      }
    `;
  };
};

export default GetProjectFilesListByProjectIdAggregateQuery;
