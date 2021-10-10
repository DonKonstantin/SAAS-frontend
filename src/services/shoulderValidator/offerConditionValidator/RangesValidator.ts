import {OfferConditionValidatorProcessorInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор корректности границ условия ЦП
 */
export class RangesValidator implements OfferConditionValidatorProcessorInterface {
    /**
     * Валидация значений условия ЦП
     * @param condition
     */
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        if (condition.is_min_value_not_limited.value || condition.is_max_value_not_limited.value) {
            return {...condition}
        }

        return {
            ...condition,
            max_value: {
                value: parseFloat(condition.max_value.value) || 0,
                error: Number(condition.min_value.value) >= Number(condition.max_value.value)
                    ? "Максимальное значение должно быть больше минимального"
                    : undefined,
            }
        };
    }
}