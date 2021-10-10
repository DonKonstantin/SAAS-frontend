import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";

/**
 * Валидатор плеча
 */
export interface ShoulderValidatorInterface {
    /**
     * Валидация значений плеча
     * @param condition
     */
    validate(condition: Values<Shoulder>): Values<Shoulder>
}

/**
 * Процессор валидации
 */
export interface ShoulderValidatorProcessorInterface {
    /**
     * Валидация значений плеча
     * @param condition
     */
    validate(condition: Values<Shoulder>): Values<Shoulder>
}