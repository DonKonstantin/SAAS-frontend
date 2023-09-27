import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetCampaignsArrayByIdsQueryParams } from "../interface";
import { FullProjectCampaign } from "services/fragments/fullCampaign";

/**
 * Запрос массива кампаний по их ID
 */
export class GetCampaignsArrayByIdsQuery
  implements GraphQLQuery<GetCampaignsArrayByIdsQueryParams>
{
  readonly query: any;
  readonly variables: GetCampaignsArrayByIdsQueryParams;

  constructor(campaignArrayId: string[]) {
    this.variables = {
      campaignArrayId,
    };

    this.query = gql`
    ${FullProjectCampaign}
    query __GET_CAMPAIGN_BY_IDS__($campaignArrayId: [ID]){
      campaigns: campaign_list(where: { id: { _in: $campaignArrayId } } )
      ${FullProjectCampaign}
    }`;
  }
}
