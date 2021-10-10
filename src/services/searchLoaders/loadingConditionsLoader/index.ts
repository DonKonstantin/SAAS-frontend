import {Loader} from "./Loader";

export const loadingConditionsLoader: {(token?: string): Loader} = token => {
    return new Loader(token)
};