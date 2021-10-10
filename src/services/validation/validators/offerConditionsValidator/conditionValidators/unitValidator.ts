import {ConditionValidationResult, ConditionValidator} from "./interfaces";
import {PriceCondition} from "../../../../priceConditionsService/interface";

/**
 * Валидатор единицы измерения
 */
export class UnitValidator implements ConditionValidator {
    async Validate(condition: PriceCondition): Promise<ConditionValidationResult> {
        return {
            field: "unit_id",
            error: !!condition.unit_id ? undefined : `Выберите значение`
        }
    }
}