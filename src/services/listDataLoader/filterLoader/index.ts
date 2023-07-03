import {FilterLoaderInterface} from "./interfaces";
import {FilterLoader} from "./FilterLoader";
import {filterBaseValuesLoader} from "./filterBaseValuesLoader";
import {filterValueLoader} from "./filterValueLoader";
import {filterPreloader} from "./filterPreloader";
import {loggerFactory} from "../../logger";

// Фабрика сервиса
export const filterLoader: { (token?: string): FilterLoaderInterface } = (token?: string): FilterLoaderInterface => (
    new FilterLoader(
        filterBaseValuesLoader(token),
        filterValueLoader(),
        filterPreloader(token),
        loggerFactory(),
    )
);