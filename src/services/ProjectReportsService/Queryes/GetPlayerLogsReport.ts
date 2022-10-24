import { gql } from "@apollo/client";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { GetPlayerLogsReportParams } from "../interface";

export class GetPlayerLogsReport implements GraphQLQuery<GetPlayerLogsReportParams> {
  readonly query: any;
  readonly variables: GetPlayerLogsReportParams;

  constructor(projectId: string, from: Date, to: Date) {
    this.variables = {
      projectId,
      from,
      to,
    };

    this.query = gql(`
      query __GET_PLAYER_LOGS__($projectId: ID!, $from: DateTime!, $to: DateTime!){
        logs: playerPlayInfoStatistic(projectId: $projectId, from: $from, to: $to){
          id
          name
          played
        }
      }
    `);
  }
}