import {Loader} from "./Loader";

export const domainsAndProjectsLoader: {(): Loader} = () => {
    return new Loader()
}