import {ShoulderValidatorProcessorInterface} from "./interface";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

export class CarrierValidator implements ShoulderValidatorProcessorInterface {
    /**
     * Валидация значений плеча
     * @param shoulder
     */
    validate(shoulder: Values<Shoulder>): Values<Shoulder> {
        return {
            ...shoulder,
            carrier_id: {
                value: shoulder.carrier_id.value ? `${shoulder.carrier_id.value}` : null,
                error: !shoulder.carrier_id.value
                    ? "Выберите значение"
                    : undefined
                ,
            }
        };
    }
}