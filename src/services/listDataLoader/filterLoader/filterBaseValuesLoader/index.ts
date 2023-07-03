import {FilterBaseValuesLoaderInterface} from "./interfaces";
import {FilterBaseValuesLoader} from "./FilterBaseValuesLoader";
import {baseLoadProcessors} from "./processors";
import {graphQLClient} from "../../../graphQLClient";
import {loggerFactory} from "../../../logger";

// Фабрика загрузчика базовых данных
export const filterBaseValuesLoader: {(token?: string): FilterBaseValuesLoaderInterface} = () => (
    new FilterBaseValuesLoader(
        baseLoadProcessors(),
        graphQLClient(),
        loggerFactory(),
    )
)