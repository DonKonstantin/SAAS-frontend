import {CargoTypeGroupsLoader} from "./CargoTypeGroupsLoader";

export const cargoTypeGroupsLoader: {(token?: string): CargoTypeGroupsLoader} = token => {
    return new CargoTypeGroupsLoader(token)
};