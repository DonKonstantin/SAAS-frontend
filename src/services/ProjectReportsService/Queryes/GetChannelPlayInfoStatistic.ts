import {gql} from "@apollo/client";
import {GraphQLQuery} from "services/graphQLClient/GraphQLClient";
import {ChannelPlayInfoStatistic, PlayInfoStatisticQueryParams} from "../types";

export type GetChannelPlayInfoStatisticResponse = {
    logs: ChannelPlayInfoStatistic[]
}

export class GetChannelPlayInfoStatistic implements GraphQLQuery<PlayInfoStatisticQueryParams> {
    readonly query: any;
    readonly variables: PlayInfoStatisticQueryParams;

    constructor(params: PlayInfoStatisticQueryParams) {
        this.variables = params;

        this.query = gql(`
        query __GET_CHANNEL_LOGS__($projectId: ID!, $from: DateTime!, $to: DateTime!) {
          logs: channelPlayInfoStatistic(projectId: $projectId, from: $from, to: $to) {
            id
            name
            played
            channel {
               id
               is_active
               name
               project_id
            }
          }
        }`);
    }
}