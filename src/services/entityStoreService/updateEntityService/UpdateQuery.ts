import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Интерфейс результата выполнения запроса обновления
 */
export interface UpdateResponse {
    result: {
        returning: {
            primaryKey: any
        }[]
    }
}

/**
 * Класс запроса обновления сущности
 */
export class UpdateQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null = null;

    constructor(query: string) {
        this.query = gql`${query}`
    }
}