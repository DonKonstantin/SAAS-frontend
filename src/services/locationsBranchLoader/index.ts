import {LocationsBranchLoaderInterface} from "./interface";
import {LocationsBranchLoader} from "./LocationsBranchLoader";

// Фабрика сервиса
export const locationsBranchLoader: {(token?: string): LocationsBranchLoaderInterface} = token => {
    return new LocationsBranchLoader(token)
};