import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Мутация изменения пароля пользователя
export class SetPasswordQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(userId: string, password: string) {
        this.query = gql`mutation __SET_PASSWORD__ {set_user_password(userId: "${userId}", password: "${password}") {success}}`
    }
}