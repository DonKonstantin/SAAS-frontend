import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetCampaignsIdByNameQueryParams } from "../interfaces";

/**
 * Запрос массива ID кампаний по имени
 */
export class GetCampaignsIdByNameQuery
  implements GraphQLQuery<GetCampaignsIdByNameQueryParams>
{
  readonly query: any;
  readonly variables: GetCampaignsIdByNameQueryParams;

  constructor(campaignName: string, projectId: string) {
    this.variables = {
      campaignName,
      projectId,
    };

    this.query = gql(`
      query __GET_CAMPAIGNS_ID_BY_NAME__($campaignName: String, $projectId: ID!){
        campaignsId: campaign_list( where: { _and: { name: {_like: $campaignName}, project_id: {_equals: $projectId} } } ){
          id
        }
      }`
    );
  }
}