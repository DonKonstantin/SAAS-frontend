import {OfferConditionValidatorProcessorInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор установки группы
 */
export class GroupValidator implements OfferConditionValidatorProcessorInterface {
    /**
     * Валидация значений условия ЦП
     * @param condition
     */
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        return {
            ...condition,
            group_num: {
                value: parseInt(condition.group_num.value) || 0,
                error: undefined,
            },
        };
    }
}