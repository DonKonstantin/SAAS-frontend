import gql from "graphql-tag";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { ProjectPlayListInputObject } from "../interfaces";

export type StorePlaylistMutationParams = {
  playList: ProjectPlayListInputObject;
};

export type StorePlaylistMutationResponse = {
  result: {
    id: string;
  };
};

/**
 * Мутация создания плейлиста
 */
export class StorePlaylistMutation
  implements GraphQLQuery<StorePlaylistMutationParams>
{
  readonly query: any;
  readonly variables: StorePlaylistMutationParams;

  constructor(playList: ProjectPlayListInputObject) {
    this.variables = { playList };
    this.query = gql`
      mutation StorePlaylist(
        $playList: ProjectPlayListInputObject!
      ) {
        result: projectPlayListStore(playList: $playList) {
          id
        }
      }
    `;
  }
}
