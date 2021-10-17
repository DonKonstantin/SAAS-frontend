import {Loader} from "./Loader";

export const allRoles: {(): Loader} = () => {
    return new Loader()
}