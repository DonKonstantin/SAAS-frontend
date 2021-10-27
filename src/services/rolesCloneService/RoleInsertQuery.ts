import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {RoleCopyData} from "./RolesLoadingQuery";
import gql from "graphql-tag";

/**
 * Запрос вставки ролей
 */
export class RoleInsertQuery implements GraphQLQuery<{roles: RoleCopyData[]}> {
    readonly query: any;
    readonly variables: { roles: RoleCopyData[] };

    constructor(roles: RoleCopyData[]) {
        this.variables = {roles}
        this.query = gql`
            mutation InsertRoles($roles: [role_insert_object_type]) {
              role_insert(objects:$roles) {
                affected_rows
              }
            }
        `
    }
}