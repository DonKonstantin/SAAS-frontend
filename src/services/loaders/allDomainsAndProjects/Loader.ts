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

    async Load(): Promise<LoaderQueryResponse> {
        try {
            return await this.client.Query<null, LoaderQueryResponse>(
                new LoaderQuery(),
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