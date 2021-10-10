import {LoaderInterface} from "../interface";
import {ContainersData, ContainersLoaderQuery, ContainersLoaderQueryResponse} from "./ContainersLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по подрядчикам
 */
export class ContainersLoader implements LoaderInterface<ContainersData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<ContainersData[]> {
        try {
            const resp = await this.client.Query<null, ContainersLoaderQueryResponse>(new ContainersLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}