import {Loader} from "./Loader";

export const localizedMessagesLoader: {(token?: string): Loader} = (token) => {
    return new Loader(token)
};