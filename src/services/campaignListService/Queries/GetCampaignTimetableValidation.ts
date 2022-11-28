import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {StoreCampaignMutationParams} from "../interface";
import {CampaignInput} from "../types";

/**
 * Проверка валидации расписания компании
 */
export class GetCampaignTimetableValidation
  implements GraphQLQuery<StoreCampaignMutationParams>
{
  readonly query: any;
  readonly variables: StoreCampaignMutationParams;

  constructor(campaign: CampaignInput) {
    this.variables = {
      campaign
    };

    this.query = gql(`
    query __GET_CAMPAIGN_VALIDATION__($campaign: CampaignInput!){
      campaignTimetableValidation(campaign: $campaign)
      }
`);
  }
}