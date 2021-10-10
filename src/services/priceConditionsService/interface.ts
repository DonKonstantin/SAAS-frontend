/**
 * Класс сущности условия ценового предложения
 */
export class PriceCondition {
    id: string | null = null;
    unit_id: string | null = null;
    min_value: number = 0;
    max_value: number = 0;
    price: number = 0;
    information_price: number = 0;
    tax_id: number | null = null;
    currency_id: string | null = null;
    is_fixed_price: boolean = false;
    is_min_value_not_limited: boolean = false;
    is_max_value_not_limited: boolean = false;
    is_tax_included_in_price: boolean = true;
    group_num: number = 0;
    minimal_payment_price: number = 0
}

/**
 * Сервис для работы с ценовыми предложениями
 */
export interface PriceConditionsServiceInterface {
    /**
     * Получение списка
     * @param ids
     */
    GetConditions(ids: any[]): Promise<PriceCondition[]>

    /**
     * Предварительная обработка условий ценовых предложений перед клонированием
     * @param conditions
     */
    ProcessConditionsBeforeClone(conditions: PriceCondition[]): PriceCondition[]

    /**
     * Обработка сохранения условий ценовых предложений
     * @param conditions
     */
    StoreConditions(conditions: PriceCondition[]): Promise<PriceCondition[]>
}