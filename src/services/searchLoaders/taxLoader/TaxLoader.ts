import {LoaderInterface} from "../interface";
import {TaxData, TaxLoaderQuery, TaxLoaderQueryResponse} from "./TaxLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по налогам
 */
export class TaxLoader implements LoaderInterface<TaxData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<TaxData[]> {
        try {
            const resp = await this.client.Query<null, TaxLoaderQueryResponse>(new TaxLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}