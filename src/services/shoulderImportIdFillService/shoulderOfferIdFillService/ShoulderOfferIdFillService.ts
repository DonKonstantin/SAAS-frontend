import {ShoulderOfferIdFillServiceInterface} from "./interface";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOfferSearchServiceInterface} from "./shoulderOfferSearchService/interface";

/**
 * Сервис заполнения ID для списка ЦП плеч
 */
export class ShoulderOfferIdFillService implements ShoulderOfferIdFillServiceInterface {
    private readonly shoulderOfferSearchService: ShoulderOfferSearchServiceInterface;

    /**
     * Конструктор сервиса
     * @param shoulderOfferSearchService
     */
    constructor(shoulderOfferSearchService: ShoulderOfferSearchServiceInterface) {
        this.shoulderOfferSearchService = shoulderOfferSearchService;
    }

    /**
     * Заполнение ID для ЦП плеча
     * @param shoulderId
     * @param offers
     */
    async fillIds(shoulderId: string, offers: Values<ShoulderOffer>[]): Promise<Values<ShoulderOffer>[]> {
        const result: Values<ShoulderOffer>[] = [];
        await Promise.all(offers.map(async offer => {
            const id = await this.shoulderOfferSearchService.searchOffer(shoulderId, offer);
            result.push({
                ...offer,
                id: {value: id}
            })
        }));

        return result;
    }
}