import gql from "graphql-tag";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { ProjectPlayListInputObject, StorePlaylistMutationParams } from "../interfaces";

/**
 * Мутация создания плейлиста
 */
export class StorePlaylistByFileMutation
  implements GraphQLQuery<StorePlaylistMutationParams>
{
  readonly query: any;
  readonly variables: StorePlaylistMutationParams;

  constructor(playList: ProjectPlayListInputObject) {
    this.variables = { playList };
    this.query = gql`
      mutation CampaignPlayListStore(
        $playList: Campaign_PlayList_Input!
      ) {
        result: campaignPlayListStore(playList: $playList) {
          duration
          id
          is_overall_volume
          name
          overall_volume
          project_id
          files {
            file_id
            id
            playlist_id
            sort
            volume
            file {              
              album
              artist
              bpm
              composer
              creation_date
              creator
              duration
              file_name
              genre
              hash_sum
              id
              isrc
              language
              last_change_date
              last_editor
              license_type
              lyricist
              mime_type
              obscene
              origin_name
              player_file_id
              publisher
              title
              year
            }
          }
          campaigns {
            campaign_all_days_start_minutes
            campaign_all_days_stop_minutes
            campaign_days_type
            campaign_end_type
            campaign_low_priority_end_type
            campaign_period_start
            campaign_period_stop
            campaign_play_order
            campaign_play_tracks_period_type
            campaign_play_tracks_period_value
            campaign_play_tracks_quantity
            campaign_play_type
            campaign_priority
            campaign_type
            days {
              campaign_id
              day_num
              days_start_minutes
              days_stop_minutes
              id
              is_active
            }
            id
            name
            project_id
            version
          }
        }
      }
    `;
  }
}
