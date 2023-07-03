import {LoaderInterface} from "../interface";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {LoaderQuery, LoaderQueryResponse} from "./LoaderQuery";

/**
 * Загрузчик данных по доменам и проектам
 */
export class Loader implements LoaderInterface<LoaderQueryResponse> {
    private readonly client: GraphQLClient;

    constructor() {
        this.client = graphQLClient()
    }

    async Load(primaryKeys: any[]): Promise<LoaderQueryResponse> {
        if (0 === primaryKeys.length) {
            return {
                domains: [],
                projects: []
            }
        }

        try {
            return await this.client.Query<{ ID: any[], count: number }, LoaderQueryResponse>(
                new LoaderQuery(primaryKeys),
                {}
            )
        } catch {
            return {
                domains: [],
                projects: []
            }
        }
    }
}