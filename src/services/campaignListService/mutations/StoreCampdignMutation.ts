import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { StoreCampdignMutationParams } from "../interface";
import { CampaignInput } from "../types";

/**
 * Мутация создания\сохранения сущьности кампании
 */
export class StoreCampdignMutation
  implements GraphQLQuery<StoreCampdignMutationParams>
{
  readonly query: any;
  readonly variables: StoreCampdignMutationParams;

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
