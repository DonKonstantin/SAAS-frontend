import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

export class ContainerAffiliationIdValidator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        if (condition.cargo_type_group.value !== "1") {
            return {
                ...condition,
                container_affiliation_id: {
                    value: null,
                }
            };
        }

        return {
            ...condition,
            container_affiliation_id: {
                value: parseInt(condition.container_affiliation_id.value) || null,
                error: !condition.container_affiliation_id.value
                    ? "Необходимо выбрать значение"
                    : undefined
                ,
            }
        };
    }
}