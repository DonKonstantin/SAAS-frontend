import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetPlaylistFilesByPlaylistIDsQueryParams } from "../interfaces";

/**
 * Запрос файлов для списка плэйлистов
 */
export class GetPlaylistFilesByPlaylistIDsQuery
  implements GraphQLQuery<GetPlaylistFilesByPlaylistIDsQueryParams>
{
  readonly query: any;
  readonly variables: GetPlaylistFilesByPlaylistIDsQueryParams;

  constructor(playlistIds: string[]) {
    this.variables = {
      playlistIds,
    };

    this.query = gql(`
      query __GET_FILES__($playlistIds: ID){
        files: playlist_list(where: {id: {_in: $playlistIds}}){
          id
          files
        }
      }`);
  }
}