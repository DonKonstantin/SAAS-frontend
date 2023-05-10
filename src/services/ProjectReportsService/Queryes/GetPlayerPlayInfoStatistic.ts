import { gql } from "@apollo/client";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import {
  PlayerPlayInfoStatistic,
  PlayInfoStatisticQueryParams,
  GetPlayerPlayInfoStatisticResponse,
} from "../types";

export const GetPlayerPlayInfoStatisticResponseDTOFactory = (
  data: GetPlayerPlayInfoStatisticResponse["logs"]
): PlayerPlayInfoStatistic[] => {
  return data.map(({ player, ...rest }) => {
    return {
      ...rest,
      player: {
        ...player,
        last_query: new Date(player.last_query),
        last_update: new Date(player.last_update),
      },
    };
  });
};

export class GetPlayerPlayInfoStatistic
  implements GraphQLQuery<PlayInfoStatisticQueryParams>
{
  readonly query: any;
  readonly variables: PlayInfoStatisticQueryParams;

  constructor(params: PlayInfoStatisticQueryParams) {
    this.variables = params;

    this.query = gql(`
    query __GET_PLAYER_LOGS__($projectId: ID!, $from: DateTime!, $to: DateTime!) {
      logs: playerPlayInfoStatistic(projectId: $projectId, from: $from, to: $to) {
        id
        name
        played
        player {
          authorization_token
          campaigns  {
            campaignId
            channelId
            id
            playerId
            uploadingStatus
          }
          guid
          id
          last_query
          last_update
          name
          object_passport_id
          player_code_id
          project_id
        }
      }
    }`);
  }
}
