import {ShoulderOfferValidatorInterface, ShoulderOfferValidatorProcessorInterface} from "./interface";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";

/**
 * Валидатор ЦП плеча
 */
export class ShoulderOfferValidator implements ShoulderOfferValidatorInterface {
    private readonly validators: ShoulderOfferValidatorProcessorInterface[];

    /**
     * Конструктор валидатора
     * @param validators
     */
    constructor(...validators: ShoulderOfferValidatorProcessorInterface[]) {
        this.validators = validators;
    }

    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        let result = condition;
        for (let validator of this.validators) {
            result = validator.validate(result);
        }

        return result;
    }
}