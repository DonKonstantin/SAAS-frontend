import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetProjectsByPlaylistIDsQueryParams } from "../interfaces";

/**
 * Запрос проектов для списка плэйлистов
 */
export class GetProjectsByPlaylistIDsQuery
  implements GraphQLQuery<GetProjectsByPlaylistIDsQueryParams>
{
  readonly query: any;
  readonly variables: GetProjectsByPlaylistIDsQueryParams;

  constructor(projectIds: string[]) {
    this.variables = {
      projectIds,
    };

    this.query = gql(`
      query __GET_PROJECTS__($projectIds: [ID]){
        projects: project_list(where: {id: {_in: $projectIds}}){
          id
          name
          active
          parent
        }
      }`);
  }
}