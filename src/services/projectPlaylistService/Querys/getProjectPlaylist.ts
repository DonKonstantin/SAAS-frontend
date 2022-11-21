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

  constructor(playlistName: string, projectId: number) {
    this.variables = {
      playlistName: `%${playlistName}%`,
      projectId
    };

    this.query = gql(`
      query __GET_CAMPAIGNS_PLAYLIST__($playlistName: String!, $projectId: ID){
        playlists: project_playlist_list(where: { _and: { name: {_like: $playlistName}, project_id: {_equals: $projectId}}}){
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
      }`);
  }
}