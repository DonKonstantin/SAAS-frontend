import {AllowanceOfferValidatorProcessorInterface} from "./interface";
import {AllowanceOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

/**
 * Валидатор значения флага "На накладную"
 */
export class InvoiceValidator implements AllowanceOfferValidatorProcessorInterface {
    /**
     * Валидация значений надбавок
     * @param condition
     */
    validate(condition: Values<AllowanceOffer>): Values<AllowanceOffer> {
        return {
            ...condition,
            is_invoice_allowance: {
                value: !!condition.is_invoice_allowance.value,
            }
        };
    }
}