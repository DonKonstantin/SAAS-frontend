import {LoaderInterface} from "../interface";
import {
    CargoTypeGroupsData,
    CargoTypeGroupsLoaderQuery,
    CargoTypeGroupsLoaderQueryResponse
} from "./CargoTypeGroupsLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по группам типов груза
 */
export class CargoTypeGroupsLoader implements LoaderInterface<CargoTypeGroupsData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<CargoTypeGroupsData[]> {
        try {
            const resp = await this.client.Query<null, CargoTypeGroupsLoaderQueryResponse>(new CargoTypeGroupsLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}