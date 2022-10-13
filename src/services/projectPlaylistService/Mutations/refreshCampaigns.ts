import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { RefreshCampaignsMutationParams } from "../interfaces";

/**
 * Запрос обновления связных компаний
 */
export class RefreshCampaignsMutation
  implements GraphQLQuery<RefreshCampaignsMutationParams>
{
  readonly query: any;
  readonly variables: RefreshCampaignsMutationParams;

  constructor(playlistIds: string[]) {
    this.variables = {
      playlistIds,
    };

    this.query = gql(`
      mutation __REFRESH_CAMPAIGNS__($playlistIds: [ID!]!) {
        campaignPublishByPlaylists(playlists: $playlistIds) 
      }`
    );
  }
}