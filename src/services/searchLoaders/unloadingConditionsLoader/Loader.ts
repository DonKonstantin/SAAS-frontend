import {LoaderInterface} from "../interface";
import {
    UnloadingConditionsData,
    UnloadingConditionsLoaderQuery,
    UnloadingConditionsLoaderQueryResponse
} from "./UnloadingConditionsLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

export class Loader implements LoaderInterface<UnloadingConditionsData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<UnloadingConditionsData[]> {
        try {
            const resp = await this.client.Query<null, UnloadingConditionsLoaderQueryResponse>(new UnloadingConditionsLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}