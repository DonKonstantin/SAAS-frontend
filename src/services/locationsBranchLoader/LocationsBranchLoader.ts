import {LocationBranchData, LocationsBranchLoaderInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {LocationsBranchLoaderQuery, LocationsBranchLoaderQueryResponse} from "./LocationsBranchLoaderQuery";

/**
 * Сервис загрузки ветки для переданных локаций
 */
export class LocationsBranchLoader implements LocationsBranchLoaderInterface {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    /**
     * Загрузка данных веток
     * @param id
     */
    async Load(id: string[]): Promise<LocationBranchData[]> {
        try {
            const resp = await this.client.Query<{ id: string[] }, LocationsBranchLoaderQueryResponse>(
                new LocationsBranchLoaderQuery(id),
                {}
            );

            return resp.locations.map(l => l.location)
        } catch {
            return []
        }
    }
}