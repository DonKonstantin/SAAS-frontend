import {Loader} from "./Loader";

export const allDomainsAndProjectsLoader: {(): Loader} = () => {
    return new Loader()
}