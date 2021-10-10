import {OfferConditionValidatorProcessorInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {v4} from "uuid";

// Нормализатор ID
export class IdNormalizer implements OfferConditionValidatorProcessorInterface {
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        return {
            ...condition,
            import_id: {value: condition.import_id.value || v4()},
            id: {value: condition.id.value || null},
            tax_id: {value: condition.tax_id.value || null}
        };
    }
}