import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Интерфейс результата выполнения запроса вставки
 */
export interface CreateResponse {
    result: {
        returning: {
            primaryKey: any
        }[]
    }
}

/**
 * Класс запроса создания сущности
 */
export class CreateQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null = null;

    constructor(query: string) {
        this.query = gql`${query}`
    }
}