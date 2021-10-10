import {Loader} from "./Loader";

export const deliveryModesLoader: {(token?: string): Loader} = token => {
    return new Loader(token)
};