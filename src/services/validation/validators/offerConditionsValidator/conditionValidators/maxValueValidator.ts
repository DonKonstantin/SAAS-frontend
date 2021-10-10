import {ConditionValidationResult, ConditionValidator} from "./interfaces";
import {PriceCondition} from "../../../../priceConditionsService/interface";

/**
 * Валидатор минимального значения
 */
export class MaxValueValidator implements ConditionValidator {
    async Validate(condition: PriceCondition): Promise<ConditionValidationResult> {
        if (condition.is_max_value_not_limited) {
            return {
                field: "max_value",
                error: undefined,
            }
        }

        if (condition.max_value <= 0) {
            return {
                field: "max_value",
                error: `Должно быть > 0`
            }
        }

        if (condition.is_min_value_not_limited) {
            return {
                field: "max_value",
                error: undefined,
            }
        }

        return {
            field: "max_value",
            error: condition.max_value > condition.min_value ? undefined : `Должно быть > мин. значения`
        }
    }
}