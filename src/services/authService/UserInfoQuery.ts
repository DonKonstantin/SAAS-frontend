import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

/**
 * Данные пользователя
 */
export interface UserInfoData {
    id: string
    email: string
    first_name: string
    last_name: string
    roles: string[]
    permissions: string[]
}

/**
 * Ответ на запрос получения данных о пользователе
 */
export interface UserInfoResponse {
    user_info: UserInfoData
}

/**
 * Запрос получения информации о пользователе
 */
export class UserInfoQuery implements GraphQLQuery<never> {
    readonly query: any;
    readonly variables: never;

    constructor() {
        this.query = gql`
            query UserInfo {
                user_info {
                    id
                    email
                    first_name
                    last_name
                    roles
                    permissions
                }
            }
        `
    }
}