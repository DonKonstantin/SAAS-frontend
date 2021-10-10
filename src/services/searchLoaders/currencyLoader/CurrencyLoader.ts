import {LoaderInterface} from "../interface";
import {CurrencyData, CurrencyLoaderQuery, CurrencyLoaderQueryResponse} from "./CurrencyLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по подрядчикам
 */
export class CurrencyLoader implements LoaderInterface<CurrencyData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<CurrencyData[]> {
        try {
            const resp = await this.client.Query<null, CurrencyLoaderQueryResponse>(new CurrencyLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}