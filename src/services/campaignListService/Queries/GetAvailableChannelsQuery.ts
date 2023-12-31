import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetAvailableChannelsQueryQueryParams } from "../interface";

/**
 * Запрос каналов по ID проекта и части имени
 */
export class GetAvailableChannelsQuery
  implements GraphQLQuery<GetAvailableChannelsQueryQueryParams>
{
  readonly query: any;
  readonly variables: GetAvailableChannelsQueryQueryParams;

  constructor(projectId: string, name: string) {
    this.variables = {
      projectId,
      name,
    };

    this.query = gql(`
    query __GET_CHANNELS__($projectId: ID, $name: String){
      channels: project_channel_list(where: { _and: { project_id: { _equals: $projectId }, name: { _like: $name } } } ){
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