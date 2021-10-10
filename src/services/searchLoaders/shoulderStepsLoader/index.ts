import {Loader} from "./Loader";

export const shoulderStepsLoader: {(token?: string): Loader} = token => {
    return new Loader(token)
};