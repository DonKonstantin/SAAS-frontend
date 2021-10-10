import {GraphQLQuery} from "../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {Schemas} from "../../settings/schema";

// Тип, описывающий данные подписки
export type QueryResponse<S extends keyof Schemas, T> = {
    [P in S]: {
        entityId: string
        eventType: "updated" | "deleted"
        data: T
    }
}

// Обертка над запросом
export class Query implements GraphQLQuery<any> {
    readonly query: any;
    readonly variables: any;

    constructor(query: string) {
        this.query = gql`${query}`;
        this.variables = null;
    }
}