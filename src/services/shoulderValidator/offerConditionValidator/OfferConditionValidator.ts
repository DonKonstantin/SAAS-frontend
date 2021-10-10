import {OfferConditionValidatorInterface, OfferConditionValidatorProcessorInterface} from "./interface";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";

/**
 * Валидатор значений условия ЦП
 */
export class OfferConditionValidator implements OfferConditionValidatorInterface {
    private readonly validators: OfferConditionValidatorProcessorInterface[];

    /**
     * Конструктор валидатора
     * @param validators
     */
    constructor(...validators: OfferConditionValidatorProcessorInterface[]) {
        this.validators = validators;
    }

    /**
     * Валидация значений условия ЦП
     * @param condition
     */
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        let result = condition;
        for (let validator of this.validators) {
            result = validator.validate(result);
        }

        return result;
    }
}