import {Loader} from "./Loader";

export const containerAffiliationLoader: {(token?: string): Loader} = token => {
    return new Loader(token)
};