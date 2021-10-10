import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

export class DeliveryModeValidator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        let {value = []} = condition.delivery_modes;
        if (!Array.isArray(value)) {
            value = [];
        }

        value = value.filter(v => !!v).map(v => `${v}`);
        return {
            ...condition,
            delivery_modes: {
                value: value,
                error: value.length === 0
                    ? "Выберите значение"
                    : undefined
                ,
            }
        };
    }
}