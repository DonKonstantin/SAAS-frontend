import {ShoulderOffersDataLoaderInterface} from "./interfaces";
import {ShoulderOffersDataLoader} from "./ShoulderOffersDataLoader";

/**
 * Фабрика сервиса
 * @param token
 */
export const shoulderOffersDataLoader: {(token?: string): ShoulderOffersDataLoaderInterface} = token => (
    new ShoulderOffersDataLoader(token)
);