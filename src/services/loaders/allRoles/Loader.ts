import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {LoaderQuery, LoaderQueryResponse} from "./LoaderQuery";

/**
 * Загрузчик данных по доменам и проектам
 */
export class Loader {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(): Promise<LoaderQueryResponse> {
        try {
            return await this.client.Query<null, LoaderQueryResponse>(
                new LoaderQuery(),
                {}
            )
        } catch {
            return {
                roles: [],
            }
        }
    }
}