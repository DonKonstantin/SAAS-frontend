import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import {Translation} from "./interface";
import gql from "graphql-tag";

// Результат выполнения запроса перевода
export interface TranslationServiceQueryResponse {
    result: Translation[]
}

// Запрос перевода текста
export class TranslationServiceQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(text: string, sourceLang: string, languages: string[]) {
        this.variables = null;
        this.query = gql`
            query {
              result: translateText(text:"${text}", sourceLangId:${sourceLang}, targetLangId:[${languages.join(",")}]) {
                languageId
                translation
              }
            }
        `;
    }
}