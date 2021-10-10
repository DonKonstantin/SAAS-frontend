import {CurrencyLoader} from "./CurrencyLoader";

export const currencyLoader: {(token?: string): CurrencyLoader} = token => {
    return new CurrencyLoader(token)
}