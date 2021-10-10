import {LoaderInterface} from "../interface";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {
    LocalizedMessagesData,
    LocalizedMessagesLoaderQuery,
    LocalizedMessagesLoaderQueryResponse
} from "./LocalizedMessagesLoaderQuery";

export class Loader implements LoaderInterface<LocalizedMessagesData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<LocalizedMessagesData[]> {
        try {
            if (!primaryKeys || primaryKeys.length === 0) {
                return [];
            }

            const resp = await this.client.Query<null, LocalizedMessagesLoaderQueryResponse>(
                new LocalizedMessagesLoaderQuery(primaryKeys),
                {}
            );
            return resp.items
        } catch {
            return []
        }
    }
}