import {PriceCondition} from "../priceConditionsService/interface";
import {Allowance} from "../allowanceTypeService/interfaces";

// Ценовое предложение для надбавки
export class AllowanceOffer {
    id: string | null = null;
    allowance: Allowance;
    isInvoiceAllowance: boolean;
    offerConditions: PriceCondition[]
}

/**
 * Сервис работы с надбавками
 */
export interface AllowanceOfferServiceInterface {
    /**
     * Получение списка
     * @param ids
     */
    GetAllowances(ids: any[]): Promise<AllowanceOffer[]>

    /**
     * Предварительная обработка надбавок перед клонированием
     * @param allowanceOffers
     */
    ProcessAllowancesBeforeClone(allowanceOffers: AllowanceOffer[]): AllowanceOffer[]

    /**
     * Обработка сохранения надбавок
     * @param allowanceOffers
     */
    StoreAllowances(allowanceOffers: AllowanceOffer[]): Promise<any[]>
}