import {Loader} from "./Loader";

export const endTransportingConditionsLoader: {(token?: string): Loader} = token => {
    return new Loader(token)
};