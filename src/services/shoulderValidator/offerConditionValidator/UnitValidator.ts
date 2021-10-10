import {OfferConditionValidatorProcessorInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор наличия выбранной ед. измерения
 */
export class UnitValidator implements OfferConditionValidatorProcessorInterface {
    /**
     * Валидация значений условия ЦП
     * @param condition
     */
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        return {
            ...condition,
            unit_id: {
                value: condition.unit_id.value ? `${condition.unit_id.value}` : null,
                error: !condition.unit_id.value ? "Выберите значение" : undefined,
            }
        };
    }
}