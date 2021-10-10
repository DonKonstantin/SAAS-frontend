import {ShoulderImportIdFillServiceInterface} from "./interface";
import {ShoulderImportIdFillService} from "./ShoulderImportIdFillService";
import {shoulderIdSearchService} from "./shoulderIdSearchService";
import {shoulderOfferIdFillService} from "./shoulderOfferIdFillService";

// Фабрика сервиса
export const shoulderImportIdFillService: {(): ShoulderImportIdFillServiceInterface} = () => {
    return new ShoulderImportIdFillService(
        shoulderIdSearchService(),
        shoulderOfferIdFillService(),
    )
};