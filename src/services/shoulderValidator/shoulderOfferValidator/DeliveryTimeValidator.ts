import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

export class DeliveryTimeValidator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        return {
            ...condition,
            delivery_time: {
                value: parseInt(condition.delivery_time.value) || 0,
                error: !condition.delivery_time.value
                    ? "Значение должно быть больше 0"
                    : undefined
                ,
            }
        };
    }
}