import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {Language} from "../../reduxStore/stores/Languages";

// Тип, описывающий результат выполнения запроса листинга языков
export interface LanguagesResponse {
    lang: Language[]
}

/**
 * Запрос листинга языков
 */
export class LanguagesQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        const query = `query __LANGS__ {lang: language_list {code, id, is_default, is_right_text_align, is_secondary_default_for_admin, name}}`
        this.query = gql`${query}`
        this.variables = null
    }
}