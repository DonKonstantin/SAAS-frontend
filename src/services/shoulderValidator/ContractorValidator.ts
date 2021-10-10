import {ShoulderValidatorProcessorInterface} from "./interface";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

export class ContractorValidator implements ShoulderValidatorProcessorInterface {
    /**
     * Валидация значений плеча
     * @param shoulder
     */
    validate(shoulder: Values<Shoulder>): Values<Shoulder> {
        return {
            ...shoulder,
            contractor_id: {
                value: shoulder.contractor_id.value ? `${shoulder.contractor_id.value}` : null,
                error: !shoulder.contractor_id.value
                    ? "Выберите значение"
                    : undefined
                ,
            }
        };
    }
}