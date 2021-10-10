import {TnvedCodeBranchLoaderInterface} from "./interface";
import {TnvedCodeBranchLoader} from "./TnvedCodeBranchLoader";
import {graphQLClient} from "../graphQLClient";
import {loggerFactory} from "../logger";

// Фабрика сервиса
export const tnvedCodeBranchLoader: {(token?: string): TnvedCodeBranchLoaderInterface} = token => {
    return new TnvedCodeBranchLoader(
        graphQLClient(token),
        loggerFactory(),
    )
};