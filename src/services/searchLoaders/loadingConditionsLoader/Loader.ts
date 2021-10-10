import {LoaderInterface} from "../interface";
import {
    LoadingConditionsData,
    LoadingConditionsLoaderQuery,
    LoadingConditionsLoaderQueryResponse
} from "./LoadingConditionsLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

export class Loader implements LoaderInterface<LoadingConditionsData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<LoadingConditionsData[]> {
        try {
            const resp = await this.client.Query<null, LoadingConditionsLoaderQueryResponse>(new LoadingConditionsLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}