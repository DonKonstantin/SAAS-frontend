import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

export type UpdateFilesByIdMutationParams = {
    ids: string[]
    fields: FileUpdateSetType
}

export type License_type = 'rao_voice' | 'srarx' | 'amurco'

export interface FileUpdateSetType {
    title?: string
    artist?: string
    album?: string
    year?: number
    genre?: string
    language?: string
    license_type?: License_type
    bpm?: number
    isrc?: string
    lyricist?: string
    composer?: string
    publisher?: string
}

export type UpdateFilesByIdMutationResponse = {
    file_data_update: {
        affected_rows: number
    }
}

export class UpdateFilesByIdMutation implements GraphQLQuery<UpdateFilesByIdMutationParams> {
    readonly query: any;
    readonly variables: UpdateFilesByIdMutationParams;

    constructor(ids: string[], fields: FileUpdateSetType) {
        this.variables = {
            ids,
            fields
        }

        this.query = gql(`
        mutation __UPDATE_FILE__($ids: [ID],$fields:file_data_update_set_type) {
          file_data_update(
          where: {
            id: {
                _in: $ids
            }
          }
          set: $fields
          ) {
            affected_rows
          }
        }`
        )
    }
}
