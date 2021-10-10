import {LoaderInterface} from "../interface";
import {CarrierData, CarrierLoaderQuery, CarrierLoaderQueryResponse} from "./CarrierLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по подрядчикам
 */
export class CarrierLoader implements LoaderInterface<CarrierData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<CarrierData[]> {
        try {
            const resp = await this.client.Query<null, CarrierLoaderQueryResponse>(new CarrierLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}