import {gql} from "@apollo/client";
import {GraphQLQuery} from "services/graphQLClient/GraphQLClient";
import {
    GlobalFilePlayInfoStatistic,
    PlayInfoStatisticQueryParams,
    ProjectFilePlayInfoStatistic
} from "../types";

export type GetFilesPlayInfoStatisticResponse = {
    projectFiles: (
     Omit<ProjectFilePlayInfoStatistic, 'file'> & {
         file: Omit<ProjectFilePlayInfoStatistic['file'], "last_change_date"> & {
             last_change_date: string
         }
    }
    )[]
    globalFiles: GlobalFilePlayInfoStatistic[]
}

export const GetFilesPlayInfoStatisticResponseDTOFactory = (data: GetFilesPlayInfoStatisticResponse["projectFiles"]): ProjectFilePlayInfoStatistic[] => {
    return data.map(({file, ...rest}) => {
        return {
            ...rest,
            file: {
                ...file,
                last_change_date: new Date(file.last_change_date),
            }
        }
    })
}

export class GetFilesPlayInfoStatistic implements GraphQLQuery<PlayInfoStatisticQueryParams> {
    readonly query: any;
    readonly variables: PlayInfoStatisticQueryParams;

    constructor(params: PlayInfoStatisticQueryParams) {
        this.variables = params;

        this.query = gql(`
    query __GET_PLAYER_LOGS__($projectId: ID!, $from: DateTime!, $to: DateTime!) {
        globalFiles: globalFilePlayInfoStatistic(projectId: $projectId, from: $from, to: $to) {
            id
            name
            played
            file {
                id
                is_active
                name
                project_id
            }
        }
        projectFiles: projectFilePlayInfoStatistic(projectId: $projectId, from: $from, to: $to) {
        id
        name
        played
        file {
            composer
            duration
            file_name
            hash_sum
            id
            last_change_date
            mime_type
            origin_name
            project_id
            title
        }
      }
    }`);
    }
}