import {LoaderInterface} from "../interface";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {TnvedCodeData, TnvedCodeLoaderQuery, TnvedCodeLoaderQueryResponse} from "./TnvedCodeLoaderQuery";

/**
 * Загрузчик данных по терминалам
 */
export class TnvedCodeLoader implements LoaderInterface<TnvedCodeData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<TnvedCodeData[]> {
        try {
            const resp = await this.client.Query<null, TnvedCodeLoaderQueryResponse>(new TnvedCodeLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}