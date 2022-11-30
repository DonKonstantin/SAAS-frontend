import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetPlaylistsIdByCampaignsIdQueryParams } from "../interfaces";

/**
 * Запрос массива ID плэйлистов по массиву ID кампаний
 */
export class GetPlaylistsIdByCampaignsIdQuery
  implements GraphQLQuery<GetPlaylistsIdByCampaignsIdQueryParams>
{
  readonly query: any;
  readonly variables: GetPlaylistsIdByCampaignsIdQueryParams;

  constructor(campaignsId: string[]) {
    this.variables = {
      campaignsId,
    };

    this.query = gql(`
      query __GET_PLAYLISTS_ID_BY_CAMPAIGNS_ID__($projectId: [ID!]!){
        campaignsId: projectPlayListByCampaigns(campaigns: $projectId)
      }`
    );
  }
}