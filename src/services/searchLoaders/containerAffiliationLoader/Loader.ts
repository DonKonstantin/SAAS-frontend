import {LoaderInterface} from "../interface";
import {
    ContainerAffiliationData,
    ContainerAffiliationLoaderQuery,
    ContainerAffiliationLoaderQueryResponse
} from "./ContainerAffiliationLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

export class Loader implements LoaderInterface<ContainerAffiliationData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<ContainerAffiliationData[]> {
        try {
            const resp = await this.client.Query<null, ContainerAffiliationLoaderQueryResponse>(new ContainerAffiliationLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}