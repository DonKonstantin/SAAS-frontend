import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetPlaylistFilesByPlaylistIdQueryParams } from "../interfaces";

/**
 * Запрос файлов для плэйлиста
 */
export class GetPlaylistFilesByPlaylistIdQuery
  implements GraphQLQuery<GetPlaylistFilesByPlaylistIdQueryParams>
{
  readonly query: any;
  readonly variables: GetPlaylistFilesByPlaylistIdQueryParams;

  constructor(playlistId: string) {
    this.variables = {
      playlistId,
    };

    this.query = gql(`
      query __GET_FILES__($playlistId: ID){
        files: project_playlist_list(where: {id: {_equals: $playlistId}}){
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