import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные категории из профиля пользователя
export interface PermissionCategoryData {
    id: string,
    level: "realm" | "domain" | "project",
    name: string
}

// Данные разрешения из профиля пользователя
export interface PermissionData {
    id: string
    category: PermissionCategoryData
    code: string
    name: string
}

// Данные роли из профиля пользователя
export interface RoleData {
    id: string
    name: string
    level: "realm" | "domain" | "project"
    structure_item_id: string
    permissions: PermissionData[]
}

// Данные профиля пользователя
export interface UserInfoData {
    id: string
    email: string
    first_name: string
    last_name: string
    roles: RoleData[]
}

/**
 * Ответ на запрос получения данных о пользователе
 */
export interface UserInfoResponse {
    userInfo: UserInfoData
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
              userInfo {
                id
                email
                first_name
                last_name
                active
                roles {
                  id
                  name
                  level
                  structure_item_id
                  permissions {
                    id
                    code
                    name
                    category {
                      id
                      name
                      level
                    }
                  }
                }
              }
            }
        `
    }
}