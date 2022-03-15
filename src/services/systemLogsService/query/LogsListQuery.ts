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
        console.log(params)
        this.variables = {
            ...params
        }

        this.query = gql(`
        query __LOGS_LIST__ (
            $orderBy: Logs_list_Order_By_Enum,
            $direction: Logs_list_Order_Direction_Enum,
            $filter: Log_Items_Filter,
            $structureId: ID!,
            $level: Logs_list_Levels_Enum,
            $limit: Int,
            $offset: Int,
        ) {
          logs: logsList(
            orderBy: $orderBy,
            orderDirection: $direction,
            filter: $filter,
            structure: $structureId,
            level: $level,
            limit: $limit,
            offset: $offset,
          ) {
                date
                entityId
                entityName
                entityType
                eventType
                eventTypeName
                user {
                    email 
                    firstName: first_name
                    id
                    lastName: last_name
                }
                userId
            }
        }`
        )
    }
}
