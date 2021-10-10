import {LoaderInterface} from "../interface";
import {
    TransportTypesData,
    TransportTypesLoaderQuery,
    TransportTypesLoaderQueryResponse
} from "./TransportTypesLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по терминалам
 */
export class TransportTypesLoader implements LoaderInterface<TransportTypesData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<TransportTypesData[]> {
        try {
            const resp = await this.client.Query<null, TransportTypesLoaderQueryResponse>(new TransportTypesLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}