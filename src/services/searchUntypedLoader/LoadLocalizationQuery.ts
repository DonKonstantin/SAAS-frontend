import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

// Данные локализованного значения
interface LocalizedFieldValue {
    id: string
    message: string
    langId: string
}

// Результат выполнения запроса локализованных значений
export interface LoadLocalizationQueryResponse {
    result: LocalizedFieldValue[]
}

// Запрос загрузки локализованных значений по их ID
export class LoadLocalizationQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor(messageIds: any[]) {
        this.variables = null;
        this.query = gql`
            query __LOAD_LOCALIZED_MESSAGES__ {
                result: localized_message_list(
                    where:{id: {_in:[${messageIds.join(",")}]}}
                ) {
                    id
                    langId: lang_id
                    message
                }
            }
        `
    }
}