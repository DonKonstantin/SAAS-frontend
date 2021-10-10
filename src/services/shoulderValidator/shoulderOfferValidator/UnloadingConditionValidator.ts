import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

export class UnloadingConditionValidator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        return {
            ...condition,
            unloading_condition_id: {
                value: condition.unloading_condition_id.value ? `${condition.unloading_condition_id.value}` : null,
                error: !condition.unloading_condition_id.value
                    ? "Выберите значение"
                    : undefined
                ,
            }
        };
    }
}