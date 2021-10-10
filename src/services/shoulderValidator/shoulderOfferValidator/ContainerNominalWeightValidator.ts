import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

export class ContainerNominalWeightValidator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        if (condition.cargo_type_group.value !== "1") {
            return {
                ...condition,
                container_nominal_weight: {
                    value: 0,
                }
            };
        }

        return {
            ...condition,
            container_nominal_weight: {
                value: parseInt(condition.container_nominal_weight.value) || 0,
                error: !condition.container_nominal_weight.value
                    ? "Значение должно быть больше 0"
                    : undefined
                ,
            }
        };
    }
}