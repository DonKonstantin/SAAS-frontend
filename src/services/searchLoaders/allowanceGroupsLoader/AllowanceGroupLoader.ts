import {LoaderInterface} from "../interface";
import {AllowanceGroupData, AllowanceGroupLoaderQuery, AllowanceGroupLoaderQueryResponse} from "./AllowanceGroupLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по налогам
 */
export class AllowanceGroupLoader implements LoaderInterface<AllowanceGroupData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<AllowanceGroupData[]> {
        try {
            const resp = await this.client.Query<null, AllowanceGroupLoaderQueryResponse>(new AllowanceGroupLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}