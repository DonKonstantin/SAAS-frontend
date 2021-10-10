import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {AllowanceOffer} from "../../shoulderImportTaskService/shoulderTypes";

/**
 * Валидатор надбавок
 */
export interface AllowanceOfferValidatorInterface {
    /**
     * Валидация значений надбавок
     * @param condition
     */
    validate(condition: Values<AllowanceOffer>): Values<AllowanceOffer>
}

/**
 * Процессор валидации
 */
export interface AllowanceOfferValidatorProcessorInterface {
    /**
     * Валидация значений надбавок
     * @param condition
     */
    validate(condition: Values<AllowanceOffer>): Values<AllowanceOffer>
}