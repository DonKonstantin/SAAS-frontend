import {CurrencyDefaultGetterInterface} from "./interface";
import {CurrencyDefaultGetter} from "./CurrencyDefaultGetter";

/**
 * Фабрика сервиса
 * @param token
 */
export const currencyDefaultGetter: {(token?: string): CurrencyDefaultGetterInterface} = token => {
    return new CurrencyDefaultGetter(token)
}