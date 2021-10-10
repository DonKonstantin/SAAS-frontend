import {LoaderInterface} from "../interface";
import {ContractorData, ContractorLoaderQuery, ContractorLoaderQueryResponse} from "./ContractorLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по подрядчикам
 */
export class ContractorLoader implements LoaderInterface<ContractorData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<ContractorData[]> {
        try {
            const resp = await this.client.Query<null, ContractorLoaderQueryResponse>(new ContractorLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}