import {LoaderInterface} from "../interface";
import {UnitData, UnitLoaderQuery, UnitLoaderQueryResponse} from "./UnitLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по единицам измерения
 */
export class UnitLoader implements LoaderInterface<UnitData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<UnitData[]> {
        try {
            const resp = await this.client.Query<null, UnitLoaderQueryResponse>(new UnitLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}