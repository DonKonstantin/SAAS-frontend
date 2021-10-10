import {AllowanceOfferValidatorInterface, AllowanceOfferValidatorProcessorInterface} from "./interface";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {AllowanceOffer} from "../../shoulderImportTaskService/shoulderTypes";

/**
 * Валидатор надбавок
 */
export class AllowanceOfferValidator implements AllowanceOfferValidatorInterface {
    private readonly validators: AllowanceOfferValidatorProcessorInterface[];

    /**
     * Конструктор валидатора
     * @param validators
     */
    constructor(...validators: AllowanceOfferValidatorProcessorInterface[]) {
        this.validators = validators;
    }

    /**
     * Валидация значений надбавок
     * @param condition
     */
    validate(condition: Values<AllowanceOffer>): Values<AllowanceOffer> {
        let result = condition;
        for (let validator of this.validators) {
            result = validator.validate(result);
        }

        return result;
    }
}