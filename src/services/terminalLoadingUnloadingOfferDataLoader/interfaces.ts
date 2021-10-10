import {PriceCondition} from "../priceConditionsService/interface";
import {AllowanceOffer} from "../allowanceService/interfaces";

/**
 * Результат загрузки данных по услугам для терминала
 */
export interface TerminalLoadingUnloadingOfferDataResult {
    id: string | null
    loading_shoulder_types: string[]
    is_loading_to_unknown_transport: boolean
    unloading_shoulder_types: string[]
    is_unloading_from_unknown_transport: boolean
    offer_conditions: PriceCondition[]
    allowance_offers: AllowanceOffer[]
    service_type: string
}

/**
 * DTO сохранения ПРР услуги терминала
 */
export interface TerminalLoadingUnloadingOfferStoreDTO {
    id: string
    loading_shoulder_types: string[]
    is_loading_to_unknown_transport: boolean
    unloading_shoulder_types: string[]
    is_unloading_from_unknown_transport: boolean
    offer_conditions: any[]
    allowance_offers: any[]
    service_type: string
}

/**
 * Загрузчик данных по условиям ПРР для услуг терминала
 */
export interface TerminalLoadingUnloadingOfferDataInterface {
    /**
     * Загрузка данных
     * @param offerIds
     */
    Load(offerIds: any[]): Promise<TerminalLoadingUnloadingOfferDataResult[]>

    /**
     * Клонирование значений перед сохранением
     * @param entities
     */
    CloneEntities(entities: TerminalLoadingUnloadingOfferDataResult[]): TerminalLoadingUnloadingOfferDataResult[]

    /**
     * Сохранение условий ПРР
     * @param entities
     */
    StoreEntities(entities: TerminalLoadingUnloadingOfferDataResult[]): Promise<TerminalLoadingUnloadingOfferStoreDTO[]>
}