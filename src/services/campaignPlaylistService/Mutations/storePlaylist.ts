import gql from "graphql-tag";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import {
  CampaignPlayListInput,
  StoreCampaignPlaylistMutationParams,
} from "../interfaces";

/**
 * Мутация создания/сохранения плейлиста кампании
 */
export class StorePlaylistMutation
  implements GraphQLQuery<StoreCampaignPlaylistMutationParams>
{
  readonly query: any;
  readonly variables: StoreCampaignPlaylistMutationParams;

  constructor(campaignPlaylist: CampaignPlayListInput) {
    this.variables = { campaignPlaylist };
    this.query = gql`
      mutation StorePlaylist($campaignPlaylist: Campaign_PlayList_Input!) {
        result: campaignPlayListStore(playList: $campaignPlaylist) {
          id
          campaign_id
          duration
          is_overall_volume
          name
          overall_volume
          project_id
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
    `;
  }
}
