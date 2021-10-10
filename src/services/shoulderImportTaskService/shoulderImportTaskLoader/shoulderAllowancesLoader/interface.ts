import {AllowanceOffer} from "../../shoulderTypes";

/**
 * Сервис загрузки надбавок из импорта
 */
export interface ShoulderAllowancesLoaderInterface {
    /**
     * Загрузка данных надбавок из импорта для переданного списка id
     * @param ids
     */
    Load(ids: string[]): Promise<AllowanceOffer[]>
}