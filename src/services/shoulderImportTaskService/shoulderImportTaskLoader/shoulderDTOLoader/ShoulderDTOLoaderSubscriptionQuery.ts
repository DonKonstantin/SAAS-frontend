import {GraphQLQuery} from "../../../graphQLClient/GraphQLClient";
import {ShoulderDTO} from "./interface";
import gql from "graphql-tag";

// Результат выполнения запроса
export interface ShoulderDTOLoaderSubscriptionQueryResponse {
    shoulder: {
        entityId: string
        eventType: "updated"
        data: ShoulderDTO
    }
}

// Запрос подписки на изменения локаций импорта
export class ShoulderDTOLoaderSubscriptionQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.variables = null;
        this.query = gql`
            subscription {
              shoulder: ShoulderToImportChanges(eventType:[updated]) {
                eventType
                entityId
                data {
                    import_id
                    id
                    shoulder_type
                    from_location_ids
                    to_location_ids
                    from_terminal_ids
                    to_terminal_ids
                    contractor_id
                    carrier_id
                    distance
                    distance_unit
                    shoulder_steps
                    is_processed
                    error
                }
              }
            }
        `
    }
}