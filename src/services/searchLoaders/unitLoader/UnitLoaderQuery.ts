import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные единиц измерения
export interface UnitData {
    id: string
    default_name: string
    is_default_for_group: boolean
    unit_symbol: string
    unit_group: string
    accuracy_in: number
    rounding_rule_in: string
    accuracy_out: number
    rounding_rule_out: string
    convertation_coefficient: number
    length: number
    width: number
    normative_height_of_stacking: number
}

export interface UnitLoaderQueryResponse {
    items: UnitData[]
}

/**
 * Запрос загрузки данных по единицам измерения
 */
export class UnitLoaderQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(ids?: any[]) {
        this.variables = null;
        this.query = gql`
            query LoadUnits {
                items: transport_unit_list(
                    limit: 1000000
                    ${ids && ids.length > 0 ? `where:{id:{_in: [${ids.map(id => `"${id}"`).join(",")}]}}` : ``}
                ) {
                    id
                    unit_symbol
                    unit_group
                    default_name
                    is_default_for_group
                    accuracy_in
                    rounding_rule_in
                    accuracy_out
                    rounding_rule_out
                    convertation_coefficient
                    length
                    width
                    normative_height_of_stacking
                }
            }
        `
    }
}