import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Мутация изменения пароля пользователя
export class CreatePasswordQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(userId: string, password: string) {
        this.query = gql`mutation __CREATE_PASSWORD__ {createUserPassword(userId: "${userId}", password: "${password}") {success}}`
    }
}