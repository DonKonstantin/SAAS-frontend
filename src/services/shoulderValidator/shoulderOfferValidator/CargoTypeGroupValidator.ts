import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

/**
 * Валидация типа груза
 */
export class CargoTypeGroupValidator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        return {
            ...condition,
            cargo_type_group: {
                value: condition.cargo_type_group.value ? `${condition.cargo_type_group.value}` : null,
                error: !condition.cargo_type_group.value
                    ? "Выберите значение"
                    : undefined
                ,
            }
        };
    }
}