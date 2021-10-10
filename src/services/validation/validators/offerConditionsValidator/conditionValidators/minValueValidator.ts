import {ConditionValidationResult, ConditionValidator} from "./interfaces";
import {PriceCondition} from "../../../../priceConditionsService/interface";

/**
 * Валидатор минимального значения
 */
export class MinValueValidator implements ConditionValidator {
    async Validate(condition: PriceCondition): Promise<ConditionValidationResult> {
        if (condition.is_min_value_not_limited) {
            return {
                field: "min_value",
                error: undefined,
            }
        }

        return {
            field: "min_value",
            error: condition.min_value >= 0 ? undefined : `Должно быть >= 0`
        }
    }
}