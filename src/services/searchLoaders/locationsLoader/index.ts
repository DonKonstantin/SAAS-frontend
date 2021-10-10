import {LocationsLoader} from "./LocationsLoader";
import {LoaderInterface} from "../interface";
import {LocationsData} from "./LocationsLoaderQuery";

export const locationsLoader: { (token?: string): LoaderInterface<LocationsData> } = (token) => {
    return new LocationsLoader(token)
};