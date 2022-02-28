import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {DoubleSearchResult, MediaFile} from "../interface";


export type SearchMediaFilesDoublesParams = {
    fileNames: string[]
}

export type SearchMediaFilesDoublesResponse = {
    searchMediaFilesDoubles : DoubleSearchResult[]
}

export class SearchMediaFilesDoublesQuery implements GraphQLQuery<SearchMediaFilesDoublesParams> {
    readonly query: any;
    readonly variables: SearchMediaFilesDoublesParams;

    constructor(fileNames: string[]) {
        this.variables = {
            fileNames
        }

        this.query = gql(`
        query search($fileNames: [String!]!) {
          searchMediaFilesDoubles(fileName: $fileNames) {
            fileName
            doubles {
              id
              title
              origin_name
              license_type
              artist
              album
              file_name
              genre
              language
            }
          }
        }`
        )
    }
}
