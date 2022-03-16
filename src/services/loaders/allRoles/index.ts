import {Loader} from "./Loader";

export const allRoles: {(token?: string): Loader} = token => {
    return new Loader(token)
}