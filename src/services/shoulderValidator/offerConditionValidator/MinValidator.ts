import {OfferConditionValidatorProcessorInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор наличия минимального значения
 */
export class MinValidator implements OfferConditionValidatorProcessorInterface {
    /**
     * Валидация значений условия ЦП
     * @param condition
     */
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        if (condition.is_min_value_not_limited.value) {
            return {
                ...condition,
                min_value: {
                    value: 0,
                }
            }
        }

        return {
            ...condition,
            min_value: {
                value: parseFloat(condition.min_value.value) || 0,
                error: typeof condition.min_value.value === "number" && condition.min_value.value < 0
                    ? "Заполните значение"
                    : undefined
                ,
            }
        };
    }
}