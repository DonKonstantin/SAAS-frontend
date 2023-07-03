import {gql} from "@apollo/client";
import {GraphQLQuery} from "services/graphQLClient/GraphQLClient";
import {
    GlobalFilePlayInfoStatistic,
    PlayInfoStatisticQueryParams,
    ProjectFilePlayInfoStatistic
} from "../types";

export type GetFilesPlayInfoStatisticResponse = {
    projectFiles:ProjectFilePlayInfoStatistic[];
    globalFiles: GlobalFilePlayInfoStatistic[];
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
              artist
              composer
              lyricist
              publisher
            }
        }
        projectFiles: projectFilePlayInfoStatistic(projectId: $projectId, from: $from, to: $to) {
            id
            name
            played
            file {
              composer
            }
       }
    }`);
    }
}