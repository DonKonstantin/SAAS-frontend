import {TaxDefaultGetterInterface} from "./interface";
import {TaxDefaultGetter} from "./TaxDefaultGetter";

/**
 * Фабрика сервиса
 * @param token
 */
export const taxDefaultGetter: {(token?: string): TaxDefaultGetterInterface} = token => {
    return new TaxDefaultGetter(token)
}