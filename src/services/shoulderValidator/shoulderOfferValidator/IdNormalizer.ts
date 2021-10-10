import {ShoulderOfferValidatorProcessorInterface} from "./interface";
import {ShoulderOffer} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {v4} from "uuid";

// Нормализатор ID
export class IdNormalizer implements ShoulderOfferValidatorProcessorInterface {
    validate(condition: Values<ShoulderOffer>): Values<ShoulderOffer> {
        return {
            ...condition,
            import_id: {value: condition.import_id.value || v4()},
            id: {value: condition.id.value || null},
        };
    }
}