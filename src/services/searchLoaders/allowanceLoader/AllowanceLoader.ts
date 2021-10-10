import {LoaderInterface} from "../interface";
import {AllowanceData, AllowanceLoaderQuery, AllowanceLoaderQueryResponse} from "./AllowanceLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по налогам
 */
export class AllowanceLoader implements LoaderInterface<AllowanceData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<AllowanceData[]> {
        try {
            const resp = await this.client.Query<null, AllowanceLoaderQueryResponse>(new AllowanceLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}