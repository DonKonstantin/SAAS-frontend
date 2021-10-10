import {OfferConditionValidatorProcessorInterface} from "./interface";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";

// Нормализатор значений для флагов
export class FlagNormalizator implements OfferConditionValidatorProcessorInterface {
    validate(condition: Values<ShoulderOfferCondition>): Values<ShoulderOfferCondition> {
        return {
            ...condition,
            is_min_value_not_limited: {value: !!condition.is_min_value_not_limited.value},
            is_max_value_not_limited: {value: !!condition.is_max_value_not_limited.value},
            is_fixed_price: {value: !!condition.is_fixed_price.value},
            is_tax_included_in_price: {value: !!condition.is_tax_included_in_price.value}
        };
    }
}