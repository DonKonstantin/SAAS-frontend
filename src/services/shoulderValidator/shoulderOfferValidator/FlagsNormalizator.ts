import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

export class FlagsNormalizator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        return {
            ...condition,
            is_danger_cargo_allowed: {value: !!condition.is_danger_cargo_allowed.value},
            is_empty_container_returning_included: {value: !!condition.is_empty_container_returning_included.value},
            is_empty_container_collecting_included: {value: !!condition.is_empty_container_collecting_included.value},
        };
    }
}