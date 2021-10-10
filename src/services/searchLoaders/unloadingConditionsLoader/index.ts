import {Loader} from "./Loader";

export const unloadingConditionsLoader: {(token?: string): Loader} = token => {
    return new Loader(token)
};