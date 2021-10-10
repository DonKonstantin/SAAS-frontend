import {LoaderInterface} from "../interface";
import {
    ShoulderTypesData,
    ShoulderTypesLoaderQuery,
    ShoulderTypesLoaderQueryResponse
} from "./ShoulderTypesLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

export class Loader implements LoaderInterface<ShoulderTypesData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<ShoulderTypesData[]> {
        try {
            const resp = await this.client.Query<null, ShoulderTypesLoaderQueryResponse>(new ShoulderTypesLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}