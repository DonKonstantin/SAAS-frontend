import {Loader} from "./Loader";

export const shoulderTypesLoader: {(token?: string): Loader} = token => {
    return new Loader(token)
};