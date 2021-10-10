import {PriceConditionsServiceInterface} from "./interface";
import {PriceConditionsService} from "./PriceConditionsService";

/**
 * Фабрика сервиса
 * @param token
 */
export const priceConditionsService: {(token?: string): PriceConditionsServiceInterface} = token => {
    return new PriceConditionsService(token)
}