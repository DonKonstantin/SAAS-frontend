import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Полученная локация
 */
interface Location {
    id: string;
    default_name: string;
    parent: number | null;
    symbol_code: string;
    localized_names: string[];
}

/**
 * Результат выполнения запроса
 */
export interface BranchForLocationQueryResult {
    getLocationsWithParents: {
        location: Location
    }[]
}

/**
 * Запрос получения ветки локации для переданной локации
 */
export class BranchForLocationQuery implements GraphQLQuery<{ id: string[] }> {
    readonly query: any;
    readonly variables: { id: string[] };

    constructor(locationIds: string[]) {
        this.variables = {id: locationIds};
        this.query = gql`
            query SearchLocationBranch($id:[ID]!) {
                getLocationsWithParents(locations: $id) {
                    location {
                      id
                      default_name
                      parent
                      symbol_code
                      localized_names
                    }
                }
            }
        `
    }
}
