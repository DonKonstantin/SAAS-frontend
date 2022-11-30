import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {GetCampaignByArrayIdQueryParams} from "../interface";

/**
 * Запрос кампании по ее ID
 */
export class GetCampaignsByArrayId
  implements GraphQLQuery<GetCampaignByArrayIdQueryParams> {
  readonly query: any;
  readonly variables: GetCampaignByArrayIdQueryParams;

  constructor(campaignArrayId: string[]) {
    this.variables = {
      campaignArrayId,
    };

    this.query = gql(`
    query __GET_CAMPAIGN__($campaignArrayId: [ID]){
    campaignChannels: campaign_list(where: { id: { _in: $campaignArrayId } } ){
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