import {ConditionValidationResult, ConditionValidator} from "./interfaces";
import {PriceCondition} from "../../../../priceConditionsService/interface";

/**
 * Валидатор валюты
 */
export class CurrencyValidator implements ConditionValidator {
    async Validate(condition: PriceCondition): Promise<ConditionValidationResult> {
        return {
            field: "currency_id",
            error: !!condition.currency_id ? undefined : `Выберите значение`
        }
    }
}