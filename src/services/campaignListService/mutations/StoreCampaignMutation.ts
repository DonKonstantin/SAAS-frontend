import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { StoreCampaignMutationParams } from "../interface";
import { CampaignInput } from "../types";

/**
 * Мутация создания\сохранения сущьности кампании
 */
export class StoreCampaignMutation
  implements GraphQLQuery<StoreCampaignMutationParams>
{
  readonly query: any;
  readonly variables: StoreCampaignMutationParams;

  constructor(campaign: CampaignInput) {
    this.variables = {
      campaign,
    };

    this.query = gql(`
    mutation __STORE_CAMPAIGN__($campaign: CampaignInput!){
      campaignStore(campaign: $campaign){
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
        playlists {
          allDaysStartMinutes
          allDaysStopMinutes
          campaignId
          campaignPlaylist {
            campaign_id
            duration
            files	{
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
            id
            is_overall_volume
            name
            overall_volume
            project_id
          }
          campaignPlaylistId
          days 	{
            campaignPlaylistConnectId
            dayNum
            daysStartMinutes
            daysStopMinutes
            id
            isActive
          }
          daysType
          id
          isCampaignTimetable
          periodStart
          periodStop
          playCounter
          projectPlaylist {
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
            duration
            files {
              file	{
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
              file_id
              id
              playlist_id
              sort
              volume
            }
            id
            is_overall_volume
            name
            overall_volume
            project_id
          }
          projectPlaylistId
          shuffle
          sortOrder
        }
        project_id
        version
            channels{
              id
              campaign_id
              channel{
                id
                is_active
                name
                players{
                  guid
                  id
                  is_active
                  last_query
                  last_update
                  name
                  object_passport_id
                  player_code_id
                  project_id
                }
                project_id
              }
              channel_id
              version
            }
        }
      }`);
  }
}
