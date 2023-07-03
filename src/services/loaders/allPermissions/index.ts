import {Loader} from "./Loader";

export const allPermissions: {(): Loader} = () => {
    return new Loader()
}