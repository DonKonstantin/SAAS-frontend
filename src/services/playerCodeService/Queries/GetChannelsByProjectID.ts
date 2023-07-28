import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { ProjectChannel } from "../interfaces";

export type GetChannelsByProjectIDQueryParams = {
  projectId: string;
};

export type GetChannelsByProjectIDQueryResponse = {
  channels: ProjectChannel[];
};

/**
 * Запрос каналов по ID проекта
 */
export class GetChannelsByProjectIDQuery
  implements GraphQLQuery<GetChannelsByProjectIDQueryParams>
{
  readonly query: any;
  readonly variables: GetChannelsByProjectIDQueryParams;

  constructor(projectId: string) {
    this.variables = {
      projectId,
    };

    this.query = gql(`
      query __GET_CHANNELS__($projectId: ID){
        channels: project_channel_list(where: {project_id: {_equals: $projectId}}, limit : 100){
          id
          is_active
          name
          project_id
        }
      }`);
  }
}