import {ShoulderOfferIdFillServiceInterface} from "./interface";
import {ShoulderOfferIdFillService} from "./ShoulderOfferIdFillService";
import {shoulderOfferSearchService} from "./shoulderOfferSearchService";

// Фабрика сервиса
export const shoulderOfferIdFillService: {(): ShoulderOfferIdFillServiceInterface} = () => {
    return new ShoulderOfferIdFillService(shoulderOfferSearchService())
};