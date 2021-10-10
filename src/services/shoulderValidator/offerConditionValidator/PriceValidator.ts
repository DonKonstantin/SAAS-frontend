import {OfferConditionValidatorProcessorInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор наличия стоимости
 */
export class PriceValidator implements OfferConditionValidatorProcessorInterface {
    /**
     * Валидация значений условия ЦП
     * @param condition
     */
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        return {
            ...condition,
            price: {
                value: parseFloat(condition.price.value) || 0,
                error: typeof condition.price.value === "number" && condition.price.value <= 0
                    ? "Должна быть > 0"
                    : undefined
                ,
            }
        };
    }
}