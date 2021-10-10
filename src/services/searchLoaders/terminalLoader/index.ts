import {Loader} from "./Loader";

export const terminalLoader: {(token?: string): Loader} = (token) => {
    return new Loader(token)
};