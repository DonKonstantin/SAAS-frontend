import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные контейнеров
export interface ShoulderTypesData {
    id: string
    default_name: string
}

export interface ShoulderTypesLoaderQueryResponse {
    items: ShoulderTypesData[]
}

/**
 * Запрос загрузки данных по группам типов груза
 */
export class ShoulderTypesLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadDeliveryModes {
                items: transport_shoulder_type_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    default_name
                }
            }
        `
    }
}