import {ShoulderValidatorInterface, ShoulderValidatorProcessorInterface} from "./interface";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор плеча
 */
export class ShoulderValidator implements ShoulderValidatorInterface {
    private readonly validators: ShoulderValidatorProcessorInterface[];

    /**
     * Конструктор валидатора
     * @param validators
     */
    constructor(...validators: ShoulderValidatorProcessorInterface[]) {
        this.validators = validators;
    }

    /**
     * Валидация значений плеча
     * @param condition
     */
    validate(condition: Values<Shoulder>): Values<Shoulder> {
        let result = condition;
        for (let validator of this.validators) {
            result = validator.validate(result);
        }

        return result;
    }
}