import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {ShoulderStepData} from "../searchLoaders/shoulderStepsLoader/ShoulderStepsLoaderQuery";

/**
 * Результат вставки сущностей шагов плеча
 */
export interface InsertShoulderStepsDataResponse {
    result: {
        returning: ShoulderStepData[]
    }
}

/**
 * Запрос создания сущностей шагов плеча
 */
export class ShoulderStepDataInsertQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(entities: ShoulderStepData[]) {
        this.variables = null;
        let objects = entities.map(entity => {
            return `{
                start_terminal_id: ${!!entity.start_terminal_id ? `${entity.start_terminal_id}` : `"null"`},
                end_terminal_id: ${!!entity.end_terminal_id ? `${entity.end_terminal_id}` : `"null"`},
                transport_type_id: ${entity.transport_type_id},
                position: ${entity.position}
            }`
        });

        this.query = gql`
            mutation ShoulderStepDataInsertQuery {
                result: transport_shoulder_step_insert(
                    objects: [${objects.join(",")}]
                ) {
                    returning {
                        id
                        start_terminal_id
                        end_terminal_id
                        transport_type_id
                        position
                    }
                }
            }
        `
    }
}