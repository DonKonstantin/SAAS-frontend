import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные шага плеча
export interface ShoulderStepData {
    id: string | null
    start_terminal_id: number | null
    end_terminal_id: number | null
    transport_type_id: string | null
    position: number
}

export interface ShoulderStepsLoaderQueryResponse {
    items: ShoulderStepData[]
}

/**
 * Запрос загрузки данных по принадлежности контейнеров
 */
export class ShoulderStepsLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query Load {
                items: transport_shoulder_step_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    start_terminal_id
                    end_terminal_id
                    transport_type_id
                    position
                }
            }
        `
    }
}