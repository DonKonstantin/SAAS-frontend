import {Loader} from "./Loader";

export const startTransportingConditionsLoader: {(token?: string): Loader} = token => {
    return new Loader(token)
};