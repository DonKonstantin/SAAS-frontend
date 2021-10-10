import {AllowanceOfferServiceInterface} from "./interfaces";
import {AllowanceOfferService} from "./AllowanceOfferService";

/**
 * Фабрика сервиса
 * @param token
 */
export const allowanceOfferService: {(token?: string): AllowanceOfferServiceInterface} = token => (
    new AllowanceOfferService(token)
)