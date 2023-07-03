import {Loader} from "./Loader";

export const allDomainsAndProjectsLoader: {(token?: string): Loader} = token => {
    return new Loader(token)
}