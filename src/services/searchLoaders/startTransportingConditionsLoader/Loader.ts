import {LoaderInterface} from "../interface";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {
    StartTransportingCondition,
    StartTransportingConditionsQuery,
    StartTransportingConditionsQueryResponse
} from "./StartTransportingConditionsQuery";

export class Loader implements LoaderInterface<StartTransportingCondition> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<StartTransportingCondition[]> {
        try {
            const resp = await this.client.Query<null, StartTransportingConditionsQueryResponse>(new StartTransportingConditionsQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}