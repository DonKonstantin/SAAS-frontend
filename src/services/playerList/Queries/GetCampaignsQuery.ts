import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { PlayerDetails } from "../interfaces";

export interface GetCampaignsQueryParams {
  playerIds: string[];
  projectId: string;
}

export interface GetCampaignsQueryResponse {
  players: PlayerDetails[];
}

/**
 * Запрос о компаниях для листинга плееров
 */
export class GetCampaignsQuery
  implements GraphQLQuery<GetCampaignsQueryParams>
{
  readonly query: any;
  readonly variables: GetCampaignsQueryParams;

  constructor(playerIds: string[], projectId: string) {
    this.variables = {
      playerIds,
      projectId,
    };

    this.query = gql(`
    query __CAMPAIGNS_FOR_PLAYER_LIST__($playerIds: [ID], $projectId: ID) {
      players: player_list(
        where: { _and: [{ project_id: { _equals: $projectId }, id: { _in: $playerIds} }] }
      ) {
        id
        campaigns {
          channel {
            is_active
          }
          campaign {
            name
          }
          uploadingStatus
        }
      }
    }`
    );
  }
}
