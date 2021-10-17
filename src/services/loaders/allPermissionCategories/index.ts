import {Loader} from "./Loader";

export const allPermissionCategories: {(): Loader} = () => {
    return new Loader()
}