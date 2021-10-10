import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Результат выполнения запроса получения дефолтных налогов
 */
export interface TaxDefaultGetterQueryResponse {
    tax: {
        id: string
    }[]
}

/**
 * Запрос получения дефолтного налога
 */
export class TaxDefaultGetterQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    /**
     * Конструктор запроса
     */
    constructor() {
        this.variables = null
        this.query = gql`
            query __TAX_DEF__ {
                tax: tax_list (where:{is_default: {_equals:true}}) {
                    id
                }
            }
        `
    }
}