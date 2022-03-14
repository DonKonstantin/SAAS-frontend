import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {LoadLogsParams, LogItemGraphResponse} from "../interface";

export type LogsListQueryParams = {

} & LoadLogsParams;

export type LogsListQueryResponse = {
    logs: LogItemGraphResponse[]
}

export class LogsListQuery implements GraphQLQuery<LogsListQueryParams> {
    readonly query: any;
    readonly variables: LogsListQueryParams;

    constructor(params: LoadLogsParams) {
        this.variables = {
            ...params
        }

        this.query = gql(`
        query __LOGS_LIST__ (
            $orderBy: Logs_list_Order_By_Enum,
            $orderDirection: Logs_list_Order_Direction_Enum,
            $filter: Log_Items_Filter,
            $structure: ID!,
            $level: Logs_list_Levels_Enum,
            $limit: Int,
            $offset: Int,
        ) {
          logs: logsList(
            orderBy: $orderBy,
            orderDirection: $orderDirection,
            filter: $filter,
            structure: $structure,
            level: $level,
            limit: $limit,
            offset: $offset,
          ) : {
                date
                entityId
                entityName
                entityType
                eventType
                eventTypeName
                user {
                    email
                    firstName
                    id
                    lastName
                }
                userId
            }
        }`
        )
    }
}
