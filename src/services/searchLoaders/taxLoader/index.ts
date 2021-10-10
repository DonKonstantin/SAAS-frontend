import {TaxLoader} from "./TaxLoader";

export const taxLoader: {(token?: string): TaxLoader} = token => {
    return new TaxLoader(token)
}