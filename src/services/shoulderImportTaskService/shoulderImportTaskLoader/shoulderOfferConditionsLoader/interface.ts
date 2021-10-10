import {ShoulderOfferCondition} from "../../shoulderTypes";

/**
 * Сервис загрузки данных для условий ЦП
 */
export interface ShoulderOfferConditionsLoaderInterface {
    /**
     * Загрузка данных условий цп из импорта для переданного списка id
     * @param ids
     */
    LoadCondition(ids: string[]): Promise<ShoulderOfferCondition[]>
}