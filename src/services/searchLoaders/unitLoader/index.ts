import {UnitLoader} from "./UnitLoader";

export const unitLoader: {(token?: string): UnitLoader} = token => {
    return new UnitLoader(token)
}