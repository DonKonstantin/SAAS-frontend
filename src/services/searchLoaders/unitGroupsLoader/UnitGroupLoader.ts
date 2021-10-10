import {LoaderInterface} from "../interface";
import {UnitGroupData, UnitGroupLoaderQuery, UnitGroupLoaderQueryResponse} from "./UnitGroupLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

/**
 * Загрузчик данных по группам единиц измерения
 */
export class UnitGroupLoader implements LoaderInterface<UnitGroupData> {
    private readonly client: GraphQLClient

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<UnitGroupData[]> {
        try {
            const resp = await this.client.Query<null, UnitGroupLoaderQueryResponse>(new UnitGroupLoaderQuery(primaryKeys), {})
            return resp.items
        } catch {
            return []
        }
    }
}