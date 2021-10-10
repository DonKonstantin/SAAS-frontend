import {FilterPreloaderInterface} from "./interfaces";
import {FilterPreloader} from "./FilterPreloader";
import {filterPreloaderProcessors} from "./processors";
import {loggerFactory} from "../../../logger";

export const filterPreloader: {(token?: string): FilterPreloaderInterface} = (token?: string): FilterPreloaderInterface => (
    new FilterPreloader(
        filterPreloaderProcessors(token),
        loggerFactory(),
    )
)