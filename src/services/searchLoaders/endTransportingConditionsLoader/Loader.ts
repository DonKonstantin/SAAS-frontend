import {LoaderInterface} from "../interface";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {
    EndTransportingCondition,
    EndTransportingConditionsQuery,
    EndTransportingConditionsQueryResponse
} from "./EndTransportingConditionsQuery";

export class Loader implements LoaderInterface<EndTransportingCondition> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<EndTransportingCondition[]> {
        try {
            const resp = await this.client.Query<null, EndTransportingConditionsQueryResponse>(new EndTransportingConditionsQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}