import {OfferConditionValidatorProcessorInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор наличия максимального значения
 */
export class MaxValidator implements OfferConditionValidatorProcessorInterface {
    /**
     * Валидация значений условия ЦП
     * @param condition
     */
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        if (condition.is_max_value_not_limited.value) {
            return {
                ...condition,
                max_value: {
                    value: 0,
                }
            }
        }

        return {
            ...condition,
            max_value: {
                value: parseFloat(condition.max_value.value) || 0,
                error: typeof condition.max_value.value === "number" && condition.max_value.value < 0
                    ? "Заполните значение"
                    : undefined
                ,
            }
        };
    }
}