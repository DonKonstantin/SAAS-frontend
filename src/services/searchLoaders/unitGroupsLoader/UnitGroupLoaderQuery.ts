import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные групп единиц измерения
export interface UnitGroupData {
    id: string
    default_name: string
    unit_symbol: string
    cargo_type_groups: string[]
    rounding_rule: string
    accuracy: number
}

export interface UnitGroupLoaderQueryResponse {
    items: UnitGroupData[]
}

/**
 * Запрос загрузки данных по группам единиц измерения
 */
export class UnitGroupLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null
        this.query = gql`
            query LoadUnitGroups {
                items: transport_unit_group_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    unit_symbol
                    default_name
                    cargo_type_groups
                    rounding_rule
                    accuracy
                }
            }
        `
    }
}