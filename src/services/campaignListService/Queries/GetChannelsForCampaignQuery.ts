import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetChannelsForCampaignQueryParams } from "../interface";

/**
 * Запрос каналов для страницы добавления каналов
 */
export class GetChannelsForCampaignQuery
  implements GraphQLQuery<GetChannelsForCampaignQueryParams>
{
  readonly query: any;
  readonly variables: GetChannelsForCampaignQueryParams;

  constructor(projectId: string, campaignId: string) {
    this.variables = {
      projectId,
      campaignId,
    };

    this.query = gql(`
    query __GET_CHANNELS__($projectId: ID, $campaignId: ID){
      channels: campaign_list(where: { _and: { project_id: { _equals: $projectId }, id: { _equals: $campaignId } } } ){
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
