import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {PriceCondition} from "../../priceConditionsService/interface";
import {Collection} from "../../types";

// Результат конвертации условий ЦП для импорта в значения, валидные для системы
export type ConvertedCondition = {
    origin: Values<ShoulderOfferCondition>
    priceCondition: PriceCondition
    validation: Collection<string | undefined>
}

/**
 * Конвертер условий ЦП для импорта
 */
export interface ShoulderImportOfferConditionsConverterInterface {
    /**
     * Конвертация значений в простые сущности
     * @param conditions
     */
    convertToSimpleValues(conditions: Values<ShoulderOfferCondition>[]): ConvertedCondition[]

    /**
     * Конвертация значений из простых в сущности импорта
     * @param priceCondition
     * @param validation
     */
    convertFromSimpleValues(
        priceCondition: PriceCondition[],
        validation: Collection<string | undefined>[],
    ): Values<ShoulderOfferCondition>[]
}