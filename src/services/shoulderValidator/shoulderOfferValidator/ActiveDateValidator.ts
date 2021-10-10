import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {ShoulderOfferValidatorProcessorInterface} from "./interface";

export class ActiveDateValidator implements ShoulderOfferValidatorProcessorInterface {
    /**
     * Валидация значений ЦП плеча
     * @param condition
     */
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        const {active_from: {value: activeFrom}, active_to: {value: activeTo}} = condition;
        if (!activeTo || !activeFrom) {
            return {
                ...condition,
                active_from: {
                    value: activeFrom ? new Date(activeFrom) : new Date(),
                    error: !activeFrom ? "Заполните значение" : undefined
                },
                active_to: {
                    value: activeTo ? new Date(activeTo) : new Date(),
                    error: !activeTo ? "Заполните значение" : undefined
                }
            }
        }

        return {
            ...condition,
            active_from: {
                value: new Date(activeFrom) || new Date(),
                error: undefined,
            },
            active_to: {
                value: new Date(activeTo) || new Date(),
                error: (new Date(activeFrom)).getTime() >= (new Date(activeTo)).getTime()
                    ? "Значение 'По' должно быть больше значения 'С'"
                    : undefined
                ,
            }
        };
    }
}