import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetChannelsByNameQueryParams } from "../interface";

/**
 * Запрос каналов по ID проекта
 */
export class GetChannelsByNameQuery
  implements GraphQLQuery<GetChannelsByNameQueryParams>
{
  readonly query: any;
  readonly variables: GetChannelsByNameQueryParams;

  constructor(projectId: string) {
    this.variables = {
      projectId,
    };

    this.query = gql(`
    query __GET_CHANNELS__($projectId: ID){
      channels: project_channel_list(where: { project_id: { _equals: $projectId } } ){
        id
        name
        is_active
        players{
          id
        }
      }
    }`);
  }
}
