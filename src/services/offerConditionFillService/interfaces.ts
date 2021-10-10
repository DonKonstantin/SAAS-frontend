import {ConvertationCoefficients} from "../convertValueBetweenUnitsService/interfaces";
import {ActiveGroup} from "../../custom/components/PriceConditionsConstructor/types";

// Параметры заполнения условия ценового предложения
export interface FillConditionParams {
    baseParams: ConvertationCoefficients,
    source: ActiveGroup,
    target: ActiveGroup,
    lastConditionNum: number,
    defaultCurrency: string | null,
    defaultTaxId: number | null,
    customPriceConvertationCallback?: {(sourceUnitValue: number, targetUnitValue: number, sourcePrice: number): number}
}

/**
 * Сервис заполнения условий ценовых предложений для целевой группы
 */
export interface OfferConditionFillServiceInterface {
    /**
     * Заполнение параметров условия ценового предложения с конвертацией значения
     * @param params
     */
    FillConditionBySource(params: FillConditionParams): ActiveGroup
}