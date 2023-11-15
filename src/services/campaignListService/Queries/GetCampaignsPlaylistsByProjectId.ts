import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetCampaignsPlaylistsByProjectIdParams } from "../interface";

/**
 * Getting playlists from campaigns selected by project ID
 */
export class GetCampaignsPlaylistsByProjectId
  implements GraphQLQuery<GetCampaignsPlaylistsByProjectIdParams>
{
  readonly query: any;
  readonly variables: GetCampaignsPlaylistsByProjectIdParams;

  constructor(projectId: string) {
    this.variables = {
      projectId,
    };

    this.query = gql(`
    query __GET_CAMPAIGNS_PLAYLISTS_BY_PROJECT_ID__($projectId: ID){
      campaigns: campaign_list(where: { project_id: { _equals: $projectId } } ) {
        name
        playlists {
          campaignPlaylist {
            files {
              file {
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
                player_file_id
              }
              file_id
              id
              playlist_id
              sort
              volume
            }
          }
        }
      }
    }`);
  }
}
