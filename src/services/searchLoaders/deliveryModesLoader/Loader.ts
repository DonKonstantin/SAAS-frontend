import {LoaderInterface} from "../interface";
import {
    DeliveryModesData,
    DeliveryModesLoaderQuery,
    DeliveryModesLoaderQueryResponse
} from "./DeliveryModesLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

export class Loader implements LoaderInterface<DeliveryModesData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<DeliveryModesData[]> {
        try {
            const resp = await this.client.Query<null, DeliveryModesLoaderQueryResponse>(new DeliveryModesLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}