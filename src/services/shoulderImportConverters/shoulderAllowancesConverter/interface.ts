import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {AllowanceOffer as AllowanceOfferImport} from "../../shoulderImportTaskService/shoulderTypes";
import {Collection} from "../../types";
import {AllowanceOffer} from "../../allowanceService/interfaces";
import {AllowanceData} from "../../searchLoaders/allowanceLoader/AllowanceLoaderQuery";
import {AllowanceGroupData} from "../../searchLoaders/allowanceGroupsLoader/AllowanceGroupLoaderQuery";

// Результат конвертации условий ЦП для импорта в значения, валидные для системы
export type ConvertedCondition = {
    origin: Values<AllowanceOfferImport>
    allowance: AllowanceOffer
    validation: Collection<string | undefined>[]
}

/**
 * Конвертер надбавок для ЦП
 */
export interface ShoulderAllowanceConverterInterface {
    /**
     * Конвертация значений в простые сущности
     * @param conditions
     * @param allowanceData
     * @param allowanceGroups
     */
    convertToSimpleValues(
        conditions: Values<AllowanceOfferImport>[],
        allowanceData: AllowanceData[],
        allowanceGroups: AllowanceGroupData[],
    ): ConvertedCondition[]

    /**
     * Конвертация значений из простых в сущности импорта
     * @param allowance
     * @param validation
     */
    convertFromSimpleValues(
        allowance: AllowanceOffer[],
        validation: Collection<string | undefined>[][],
    ): Values<AllowanceOfferImport>[]
}