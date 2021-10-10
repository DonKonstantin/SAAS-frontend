import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

export class LoadingConditionValidator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        return {
            ...condition,
            loading_condition_id: {
                value: condition.loading_condition_id.value ? `${condition.loading_condition_id.value}` : null,
                error: !condition.loading_condition_id.value
                    ? "Выберите значение"
                    : undefined
                ,
            }
        };
    }
}