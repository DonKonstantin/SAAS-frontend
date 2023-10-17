import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { GetCampaignsFilesRequest } from "../types";
import { DocumentNode } from "graphql";
import { gql } from "@apollo/client";

/**
 * Запрос на получение плэйлистов кампании по ID проекта
 */
class GetCampaignsFiles implements GraphQLQuery<GetCampaignsFilesRequest> {
  readonly query: DocumentNode;
  readonly variables: GetCampaignsFilesRequest;

  constructor(projectId: string) {
    this.variables = {
      projectId,
    };

    this.query = gql`
      query __PROJECT_CAMPAIGNS_PLAYLISTS__($projectId: ID) {
        campaigns: campaign_list(where: { project_id: { _equals: $projectId } }) {
          playlists {
            campaignPlaylist {
              campaign_id
              duration
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
              id
              is_overall_volume
              name
              overall_volume
              project_id
            }
          }
        }
      }
    `;
  }
};

export default GetCampaignsFiles;