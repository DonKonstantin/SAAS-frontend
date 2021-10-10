import {ContainersLoader} from "./ContainersLoader";

export const containersLoader: {(token?: string): ContainersLoader} = token => {
    return new ContainersLoader(token)
}