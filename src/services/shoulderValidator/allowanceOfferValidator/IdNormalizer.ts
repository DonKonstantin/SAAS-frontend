import {AllowanceOfferValidatorProcessorInterface} from "./interface";
import {AllowanceOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {v4} from "uuid";

// Нормализатор ID
export class IdNormalizer implements AllowanceOfferValidatorProcessorInterface {
    validate(condition: Values<AllowanceOffer>): Values<AllowanceOffer> {
        return {
            ...condition,
            import_id: {value: condition.import_id.value || v4()},
            id: {value: condition.id.value || null}
        };
    }
}