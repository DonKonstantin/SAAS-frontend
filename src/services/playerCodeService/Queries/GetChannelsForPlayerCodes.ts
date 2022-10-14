import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { PlayerWithoutRelations } from "../interfaces";

export type GetChannelsForPlayerCodesQueryParams = {
  projectId: string;
  playerCodeKeys: string[];
};

export type GetChannelsForPlayerCodesQueryResponse = {
  player_code: {
    code: string;
    players: PlayerWithoutRelations[];
  }[];
};

/**
 * Запрос каналов по ID проекта
 */
export class GetChannelsForPlayerCodesQuery
  implements GraphQLQuery<GetChannelsForPlayerCodesQueryParams>
{
  readonly query: any;
  readonly variables: GetChannelsForPlayerCodesQueryParams;

  constructor(projectId: string, playerCodeKeys: string[]) {
    this.variables = {
      projectId,
      playerCodeKeys,
    };

    this.query = gql(`
      query __ITEMS_LIST__($projectId: ID, $playerCodeKeys: [String]) {
        player_code: player_code_list(
          where: { _and: [{ project_id: { _equals: $projectId }, code: { _in: $playerCodeKeys } }] }
        ) {
          code
    			players {
            is_active
            name
            last_update
          }
        }
      }`);
  }
}
