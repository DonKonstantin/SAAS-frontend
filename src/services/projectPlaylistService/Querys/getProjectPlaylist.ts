import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetPlaylistsCampaignByNameParams } from "../interfaces";

/**
 * Запрос плейлистов по имени
 */
export class GetCampaignsProjectPlaylistQuery
  implements GraphQLQuery<GetPlaylistsCampaignByNameParams>
{
  readonly query: any;
  readonly variables: GetPlaylistsCampaignByNameParams;

  constructor(playlistName: string) {
    this.variables = {
      playlistName,
    };

    this.query = gql(`
      query __GET_CAMPAIGNS_PLAYLIST__($playlistName: String!){
        playlists: project_playlist_list(where: {name: {_like: $playlistName}}){
          name,
          duration,
          id,
          project_id,
          files {
          file_id
          }
        }
      }`);
  }
}