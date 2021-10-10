import {OfferConditionValidatorProcessorInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор дополнительных стоимости
 */
export class AdditionPriceValidator implements OfferConditionValidatorProcessorInterface {
    /**
     * Валидация значений условия ЦП
     * @param condition
     */
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        return {
            ...condition,
            minimal_payment_price: {
                value: parseFloat(condition.minimal_payment_price.value) || 0,
                error: undefined,
            },
            information_price: {
                value: parseFloat(condition.information_price.value) || 0,
                error: undefined,
            }
        };
    }
}