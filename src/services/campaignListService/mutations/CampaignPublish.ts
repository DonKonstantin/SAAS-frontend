import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { CampaignPublishQueryParams } from "../interface";

/**
 * Запрос обновления связных компаний
 */
export class CampaignPublish
  implements GraphQLQuery<CampaignPublishQueryParams>
{
  readonly query: any;
  readonly variables: CampaignPublishQueryParams;

  constructor(campaignId:number, channelIds: number[]) {
    this.variables = {
      campaignId,
      channelIds,
    };

    this.query = gql(`
      mutation __PUBLISH_CAMPAIGN__($campaignId: ID!, $channelIds: [ID!]!) {
        campaignPublish(campaignId: $campaignId, channelId: $channelIds)
      }`
    );
  }
}