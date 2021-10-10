import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {LocationBranchData} from "./interface";

// Результат выполнения запроса поиска
export type LocationsBranchLoaderQueryResponse = {
    locations: {
        location: LocationBranchData
    }[]
};

// Запрос поиска ветки для переданных локаций
export class LocationsBranchLoaderQuery implements GraphQLQuery<{ id: string[] }> {
    readonly query: any;
    readonly variables: { id: string[] };

    constructor(id: string[]) {
        this.variables = {id};
        this.query = gql`
            query BranchQuery($id: [ID]!) {
              locations: getLocationsWithParents(locations:$id) 
              {    
                location {
                  children
                  default_name
                  id
                  import_id
                  is_country
                  is_user_searchable
                  latitude
                  localized_names
                  longitude
                  parent
                  populated_area
                  population
                  search_tags
                  symbol_code
                }
              }
            }
        `
    }
}