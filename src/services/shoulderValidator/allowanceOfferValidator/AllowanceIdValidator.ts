import {AllowanceOfferValidatorProcessorInterface} from "./interface";
import {AllowanceOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор наличия выбранной надбавки
 */
export class AllowanceIdValidator implements AllowanceOfferValidatorProcessorInterface {
    /**
     * Валидация значений надбавок
     * @param condition
     */
    validate(condition: Values<AllowanceOffer>): Values<AllowanceOffer> {
        return {
            ...condition,
            allowance_id: {
                value: condition.allowance_id.value ? `${condition.allowance_id.value}` : null,
                error: !condition.allowance_id.value
                    ? "Выберите значение"
                    : undefined
                ,
            }
        };
    }
}