import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

/**
 * Валидация выбранных контейнеров
 */
export class ContainersValidator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        if (condition.cargo_type_group.value !== "1") {
            return {
                ...condition,
                containers: {
                    value: [],
                }
            };
        }

        let {value} = condition.containers;
        if (!value || !Array.isArray(value)) {
            value = [];
        }

        value = value.filter(v => !!v).map(v => `${v}`);

        return {
            ...condition,
            containers: {
                value: value,
                error: value.length === 0
                    ? "Необходимо выбрать хотя бы одно значение"
                    : undefined
                ,
            }
        };
    }
}