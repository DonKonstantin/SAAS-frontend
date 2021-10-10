import {PriceCondition} from "../priceConditionsService/interface";

/**
 * Результат загрузки данных по ценовым предложениям для плеч
 */
export interface ShoulderOfferData {
    id: string
    shoulder_id: string
    cargo_type_group: string
    containers: string[]
    container_affiliation_id: number | null
    loading_condition_id: string
    unloading_condition_id: string
    active_from: string
    active_to: string
    offer_conditions: PriceCondition[]
}

/**
 * Загрузчик данных по ценовым предложениям для плеч
 */
export interface ShoulderOffersDataLoaderInterface {
    /**
     * Загрузка данных
     * @param shoulderIds
     */
    Load(shoulderIds: any[]): Promise<ShoulderOfferData[]>
}