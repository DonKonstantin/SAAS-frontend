import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetCampaignsByPlaylistIDsQueryParams } from "../interfaces";

/**
 * Запрос проектов для списка плэйлистов
 */
export class GetCampaignsByPlaylistIDsQuery
  implements GraphQLQuery<GetCampaignsByPlaylistIDsQueryParams>
{
  readonly query: any;
  readonly variables: GetCampaignsByPlaylistIDsQueryParams;

  constructor(playlistIds: string[]) {
    this.variables = {
      playlistIds,
    };

    this.query = gql(`
      query __GET_CAMPAIGNS__($playlistIds: [ID]){
        campaigns: project_playlist_list(where: {id: {_in: $playlistIds}}){
          id
          campaigns {
            name
          }
        }
      }`);
  }
}