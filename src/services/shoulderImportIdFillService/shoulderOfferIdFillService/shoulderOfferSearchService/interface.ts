import {Values} from "../../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../../shoulderImportTaskService/shoulderTypes";

/**
 * Сервис поиска условия ЦП для переданных параметров
 */
export interface ShoulderOfferSearchServiceInterface {
    /**
     * Поиск первого доступного предложения для переданных параметров
     * @param shoulderId
     * @param offer
     */
    searchOffer(shoulderId: string, offer: Values<ShoulderOffer>): Promise<string | null>
}