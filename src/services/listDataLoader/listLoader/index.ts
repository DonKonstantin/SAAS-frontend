import {ListLoaderInterface} from "./interfaces";
import {ListLoader} from "./ListLoader";
import {queryGenerator} from "./queryGenerator";
import {graphQLClient} from "../../graphQLClient";
import {loggerFactory} from "../../logger";

// Фабрика сервиса
export const listLoader: {(token?: string): ListLoaderInterface} = (token?: string): ListLoaderInterface => (
    new ListLoader(
        queryGenerator(token),
        graphQLClient(token),
        loggerFactory(),
        token,
    )
);