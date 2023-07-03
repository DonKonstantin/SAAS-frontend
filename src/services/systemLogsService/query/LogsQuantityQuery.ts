import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {LogsFilterParams, LogsLevel} from "../interface";

export type LogsQuantityQueryParams = {
    structureId: string;
    level: LogsLevel;
    filter: LogsFilterParams;
};

export type LogsQuantityQueryResponse = {
    count: number
}

export class LogsQuantityQuery implements GraphQLQuery<LogsQuantityQueryParams> {
    readonly query: any;
    readonly variables: LogsQuantityQueryParams;

    constructor(params: LogsQuantityQueryParams) {
        this.variables = {
            ...params
        }

        this.query = gql(`
        query __LOGS_QUANTITY__(
            $filter: Log_Items_Filter,
            $structureId: ID!,
            $level: Logs_list_Levels_Enum,
        ) {
          count: logsQuantity(
            structure: $structureId,
            level: $level,
            filter: $filter,
          )
        }`
        )
    }
}
