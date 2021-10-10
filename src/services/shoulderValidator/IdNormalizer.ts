import {ShoulderValidatorProcessorInterface} from "./interface";
import {v4} from "uuid";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";

// Нормализатор ID
export class IdNormalizer implements ShoulderValidatorProcessorInterface {
    validate(condition: Values<Shoulder>): Values<Shoulder> {
        return {
            ...condition,
            import_id: {value: condition.import_id.value || v4()},
            id: {value: condition.id.value || null}
        };
    }
}