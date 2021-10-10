import {ShoulderOffer} from "../../shoulderTypes";

/**
 * Сервис загрузки ЦП плеч
 */
export interface ShoulderOfferLoaderInterface {
    /**
     * Загрузка данных ЦП из импорта для переданного списка id плеч
     * @param ids
     */
    Load(ids: string[]): Promise<(ShoulderOffer & {shoulder_id: string})[]>
}