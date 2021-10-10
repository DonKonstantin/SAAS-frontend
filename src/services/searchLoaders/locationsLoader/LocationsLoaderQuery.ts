import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные локации
export interface LocationsData {
    id: string
    default_name: string
    localized_names: string[]
    symbol_code: string
}

export interface LocationsLoaderQueryResponse {
    items: LocationsData[]
}

/**
 * Запрос загрузки данных по локациям
 */
export class LocationsLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadLocations {
                items: locations_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    default_name
                    localized_names
                    symbol_code
                }
            }
        `
    }
}