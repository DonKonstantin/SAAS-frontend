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
          id
        }
      }`
    );
  }
}