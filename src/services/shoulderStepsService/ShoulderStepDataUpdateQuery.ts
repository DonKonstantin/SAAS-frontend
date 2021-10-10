import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {ShoulderStepData} from "../searchLoaders/shoulderStepsLoader/ShoulderStepsLoaderQuery";

/**
 * Результат обновления сущности шагов плеча
 */
export interface UpdateShoulderStepDataResponse {
    result: {
        returning: ShoulderStepData[]
    }
}

/**
 * Запрос обновления сущности шагов плеча
 */
export class ShoulderStepDataUpdateQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(entity: ShoulderStepData) {
        this.variables = null;
        this.query = gql`
            mutation ShoulderStepDataUpdateQuery {
                result: transport_shoulder_step_update(
                    set: {
                        start_terminal_id: ${!!entity.start_terminal_id ? `${entity.start_terminal_id}` : `"null"`},
                        end_terminal_id: ${!!entity.end_terminal_id ? `${entity.end_terminal_id}` : `"null"`},
                        transport_type_id: ${entity.transport_type_id},
                        position: ${entity.position}
                    },
                    where: {id: {_equals: ${`"${entity.id}"`}}}
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