import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {gql} from "@apollo/client";

/**
 * Запрос сброса пароля пользователя по переданному E-mail
 */
export class ResetPasswordQuery implements GraphQLQuery<{email: string}> {
    readonly query: any;
    readonly variables: {email: string};

    constructor(email: string) {
        this.variables = {email}
        this.query = gql`
            mutation ResetPassword($email: String!) {
              resetUserPassword(email: $email) {
                success
              }
            }
        `
    }
}