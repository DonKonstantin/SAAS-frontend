import {ConditionValidationResult, ConditionValidator} from "./interfaces";
import {PriceCondition} from "../../../../priceConditionsService/interface";

/**
 * Валидатор стоимости
 */
export class PriceValidator implements ConditionValidator {
    async Validate(condition: PriceCondition): Promise<ConditionValidationResult> {
        return {
            field: "price",
            error: condition.price > 0 ? undefined : `Должна быть > 0`
        }
    }
}