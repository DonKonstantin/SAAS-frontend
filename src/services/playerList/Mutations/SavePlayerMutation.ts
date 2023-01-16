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

    let variables = `$playerId: ID!`;
    let parameters =`playerId: $playerId`;

    if (objectPasportId) {
      variables += `, $objectPasportId: int64ID`
      parameters += `, objectPassportId: $objectPasportId`
    }

    this.query = gql(`
    mutation __SAVE_PLAYER__(${variables}) {
      updatePlayer (${parameters}) {
        id
      }
    }`
    );
  }
}
