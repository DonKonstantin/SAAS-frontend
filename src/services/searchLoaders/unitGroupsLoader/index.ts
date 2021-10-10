import {UnitGroupLoader} from "./UnitGroupLoader";

export const unitGroupsLoader: {(token?: string): UnitGroupLoader} = token => {
    return new UnitGroupLoader(token)
}