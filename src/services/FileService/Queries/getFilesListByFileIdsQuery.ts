import { gql } from "@apollo/client";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { GetFilesListByFileIdsQueryParams } from "../interfaces";

/**
 * Запрос получениясписка файлов по масиву ID
 */
class GetFilesListByFileIdsQuery
  implements GraphQLQuery<GetFilesListByFileIdsQueryParams>
{
  readonly query: any;
  readonly variables: GetFilesListByFileIdsQueryParams;

  constructor(fileIds: string[]) {
    this.variables = { fileIds };
    this.query = gql`
      query __GET_FILES_BY_IDS__($fileIds: [ID]) {
        files: file_list(where: { id: { _in: $fileIds } }) {
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
          publisher
          title
          year
        }
      }
    `;
  }
}

export default GetFilesListByFileIdsQuery;
