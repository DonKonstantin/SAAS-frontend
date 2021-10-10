import {ShoulderValidatorProcessorInterface} from "./interface";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

export class ShoulderTypeValidator implements ShoulderValidatorProcessorInterface {
    /**
     * Валидация значений плеча
     * @param shoulder
     */
    validate(shoulder: Values<Shoulder>): Values<Shoulder> {
        return {
            ...shoulder,
            shoulder_type: {
                value: shoulder.shoulder_type.value ? `${shoulder.shoulder_type.value}` : null,
                error: !shoulder.shoulder_type.value
                    ? "Выберите значение"
                    : undefined
                ,
            }
        };
    }
}