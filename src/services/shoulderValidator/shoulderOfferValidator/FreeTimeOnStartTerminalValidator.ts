import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

export class FreeTimeOnStartTerminalValidator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        const value = parseInt(condition.free_time_for_container_usage_on_start_terminal.value) || 0;
        return {
            ...condition,
            free_time_for_container_usage_on_start_terminal: {
                value: value,
                error: value < 0
                    ? "Значение должно быть больше или равно 0"
                    : undefined
                ,
            }
        };
    }
}