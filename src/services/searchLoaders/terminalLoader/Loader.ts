import {LoaderInterface} from "../interface";
import {TerminalsData, TerminalsLoaderQuery, TerminalsLoaderQueryResponse} from "./TerminalsLoaderQuery";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";

export class Loader implements LoaderInterface<TerminalsData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<TerminalsData[]> {
        try {
            const resp = await this.client.Query<null, TerminalsLoaderQueryResponse>(new TerminalsLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}