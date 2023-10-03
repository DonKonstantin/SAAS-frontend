import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetCampaignByIdQueryParams } from "../interface";
import { FullProjectCampaign } from "services/fragments/fullCampaign";

/**
 * Запрос кампании по ее ID
 */
export class GetCampaignByIdQuery
  implements GraphQLQuery<GetCampaignByIdQueryParams>
{
  readonly query: any;
  readonly variables: GetCampaignByIdQueryParams;

  constructor(campaignId: string) {
    this.variables = {
      campaignId,
    };

    this.query = gql(`
    query __GET_CAMPAIGN__($campaignId: ID){
      campaign: campaign_list(where: { id: { _equals: $campaignId } } )
      ${FullProjectCampaign}
    }`);
  }
}
