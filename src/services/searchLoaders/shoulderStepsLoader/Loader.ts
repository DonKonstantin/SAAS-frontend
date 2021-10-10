import {LoaderInterface} from "../interface";
import {graphQLClient} from "../../graphQLClient";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {ShoulderStepData, ShoulderStepsLoaderQuery, ShoulderStepsLoaderQueryResponse} from "./ShoulderStepsLoaderQuery";

export class Loader implements LoaderInterface<ShoulderStepData> {
    private readonly client: GraphQLClient;

    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    async Load(primaryKeys?: any[]): Promise<ShoulderStepData[]> {
        try {
            const resp = await this.client.Query<null, ShoulderStepsLoaderQueryResponse>(new ShoulderStepsLoaderQuery(primaryKeys), {});
            return resp.items
        } catch {
            return []
        }
    }
}