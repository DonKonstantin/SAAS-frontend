import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetPlaylistFilesByPlaylistIdsQueryParams } from "../interfaces";

/**
 * Запрос файлов для плэйлиста
 */
export class GetPlaylistFilesByPlaylistIdsQuery
  implements GraphQLQuery<GetPlaylistFilesByPlaylistIdsQueryParams>
{
  readonly query: any;
  readonly variables: GetPlaylistFilesByPlaylistIdsQueryParams;

  constructor(playlistIds: string[]) {
    this.variables = {
      playlistIds,
    };

    this.query = gql(`
      query __GET_FILES__($playlistIds: [ID]){
        files: project_playlist_list(where: {id: {_in: $playlistIds}}){
          id
          files {
            id
            file_id
            playlist_id
            sort
            volume
            file {
              album
              artist
              bpm
              composer
              creation_date
              creator
              duration
              file_name
              genre
              hash_sum
              id
              isrc
              language
              last_change_date
              last_editor
              license_type
              lyricist
              mime_type
              obscene
              origin_name
              player_file_id
              publisher
              title
              year
            }
          }
        }
      }`);
  }
}