import {ShoulderValidatorProcessorInterface} from "./interface";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

export class DistanceValidator implements ShoulderValidatorProcessorInterface {
    /**
     * Валидация значений плеча
     * @param shoulder
     */
    validate(shoulder: Values<Shoulder>): Values<Shoulder> {
        return {
            ...shoulder,
            distance: {
                value: parseInt(shoulder.distance.value) || 0,
                error: (parseInt(shoulder.distance.value) || 0) < 0
                    ? "Значение должно быть больше 0"
                    : undefined
                ,
            }
        };
    }
}