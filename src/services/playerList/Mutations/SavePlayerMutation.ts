import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import gql from "graphql-tag";

export interface SavePlayerMutationParams {
  playerId: string;
  objectPasportId: string;
}

export interface SavePlayerMutationResponse {
  updatePlayer: {
    id: string;
  };
}

/**
 * Мутация сохранения плеера
 */
export class SavePlayerMutation
  implements GraphQLQuery<SavePlayerMutationParams>
{
  readonly query: any;
  readonly variables: SavePlayerMutationParams;

  constructor(playerId: string, objectPasportId: string) {
    this.variables = {
      playerId,
      objectPasportId,
    };

    this.query = gql(`
    mutation __SAVE_PLAYER__($playerId: ID!, $objectPasportId: int64ID) {
      updatePlayer (objectPassportId: $objectPasportId, playerId: $playerId) {
        id
      }
    }`
    );
  }
}
