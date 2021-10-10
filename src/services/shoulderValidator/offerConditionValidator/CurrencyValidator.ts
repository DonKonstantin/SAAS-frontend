import {OfferConditionValidatorProcessorInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор наличия выбранной валюты
 */
export class CurrencyValidator implements OfferConditionValidatorProcessorInterface {
    /**
     * Валидация значений условия ЦП
     * @param condition
     */
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        return {
            ...condition,
            currency_id: {
                value: condition.currency_id.value ? `${condition.currency_id.value}` : null,
                error: !condition.currency_id.value ? "Выберите значение" : undefined,
            }
        };
    }
}