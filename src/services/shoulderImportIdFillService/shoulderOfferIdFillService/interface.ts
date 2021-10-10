import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";

/**
 * Сервис заполнения ID для списка ЦП плеч
 */
export interface ShoulderOfferIdFillServiceInterface {
    /**
     * Заполнение ID для ЦП плеча
     * @param shoulderId
     * @param offers
     */
    fillIds(shoulderId: string, offers: Values<ShoulderOffer>[]): Promise<Values<ShoulderOffer>[]>
}