import {LoaderInterface} from "../interface";
import {LocationsData, LocationsLoaderQuery, LocationsLoaderQueryResponse} from "./LocationsLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по подрядчикам
 */
export class LocationsLoader implements LoaderInterface<LocationsData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<LocationsData[]> {
        try {
            const resp = await this.client.Query<null, LocationsLoaderQueryResponse>(new LocationsLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}