import {FillConditionParams, OfferConditionFillServiceInterface} from "./interfaces";
import {
    ConvertationCoefficients,
    ConvertValueBetweenUnitsServiceInterface
} from "../convertValueBetweenUnitsService/interfaces";
import {ActiveGroup, ActiveGroupPriceCondition} from "../../custom/components/PriceConditionsConstructor/types";
import {UnitData} from "../searchLoaders/unitLoader/UnitLoaderQuery";
import {UnitGroupData} from "../searchLoaders/unitGroupsLoader/UnitGroupLoaderQuery";
import {convertValueBetweenUnitsService} from "../convertValueBetweenUnitsService";

/**
 * Сервис заполнения условий ценовых предложений для целевой группы
 */
export class OfferConditionFillService implements OfferConditionFillServiceInterface {
    private readonly convertService: ConvertValueBetweenUnitsServiceInterface;
    private readonly units: UnitData[];

    /**
     * Конструктор сервиса
     * @param unitGroups
     * @param units
     */
    constructor(unitGroups: UnitGroupData[], units: UnitData[]) {
        this.units = units;
        this.convertService = convertValueBetweenUnitsService(unitGroups)
    }

    /**
     * Заполнение параметров условия ценового предложения с конвертацией значения
     * @param params
     */
    FillConditionBySource(params: FillConditionParams): ActiveGroup {
        let filledTarget: ActiveGroup = JSON.parse(JSON.stringify(params.target));
        filledTarget.priceConditions = [];

        let nextNum = params.lastConditionNum;
        params.source.priceConditions.map(sourceCondition => {
            nextNum++;
            let newCondition = this.FillCondition(params.baseParams, params.target, nextNum, sourceCondition, params.customPriceConvertationCallback);

            if (!params.baseParams.fillConditions) {
                newCondition.priceCondition = {
                    ...newCondition.priceCondition,
                    max_value: 0,
                    min_value: 0,
                    is_max_value_not_limited: false,
                    is_min_value_not_limited: false,
                }
            }

            if (!params.baseParams.fillPrices) {
                newCondition.priceCondition = {
                    ...newCondition.priceCondition,
                    information_price: 0,
                    price: 0,
                    minimal_payment_price: 0,
                    is_fixed_price: false,
                    is_tax_included_in_price: true,
                    tax_id: params.defaultTaxId,
                    currency_id: params.defaultCurrency,
                }
            }

            filledTarget.priceConditions.push(newCondition)
        });

        return filledTarget;
    }

    /**
     * Полное заполнение условия ценового предложения на основе данных из источника
     *
     * @param baseParams
     * @param target
     * @param nextNum
     * @param sourceCondition
     * @param customPriceConvertationCallback
     */
    private FillCondition(
        baseParams: ConvertationCoefficients,
        target: ActiveGroup,
        nextNum: number,
        sourceCondition: ActiveGroupPriceCondition,
        customPriceConvertationCallback?: {(sourceUnitValue: number, targetUnitValue: number, sourcePrice: number): number},
    ): ActiveGroupPriceCondition {
        let newCondition: ActiveGroupPriceCondition = {
            ...JSON.parse(JSON.stringify(sourceCondition)),
            number: nextNum,
        };

        newCondition.priceCondition.id = null;
        newCondition.priceCondition.unit_id = baseParams.targetUnit.id;

        const sourceUnit: UnitData = JSON.parse(JSON.stringify(this.units.find(u => u.id === sourceCondition.priceCondition.unit_id)));
        if (!newCondition.priceCondition.is_min_value_not_limited) {
            newCondition.priceCondition.min_value = this.convertService.Convert({
                ...baseParams,
                sourceUnit: sourceUnit,
                value: newCondition.priceCondition.min_value,
            })
        } else {
            newCondition.priceCondition.min_value = 0
        }

        if (!newCondition.priceCondition.is_max_value_not_limited) {
            newCondition.priceCondition.max_value = this.convertService.Convert({
                ...baseParams,
                sourceUnit: sourceUnit,
                value: newCondition.priceCondition.max_value,
            })
        } else {
            newCondition.priceCondition.max_value = 0
        }



        if (!newCondition.priceCondition.is_fixed_price) {
            let sourceUnitValue = 100;
            switch (true) {
                case !sourceCondition.priceCondition.is_max_value_not_limited:
                    sourceUnitValue = sourceCondition.priceCondition.max_value;
                    break;
                case !sourceCondition.priceCondition.is_min_value_not_limited:
                    sourceUnitValue = sourceCondition.priceCondition.min_value;
                    break
            }

            const targetUnitValue = this.convertService.Convert({
                ...baseParams,
                sourceUnit: sourceUnit,
                value: sourceUnitValue,
            });

            let priceConvertationCallback: {(sourceUnitValue: number, targetUnitValue: number, sourcePrice: number): number} = (sourceUnitValue, targetUnitValue, sourcePrice) => {
                return (sourceUnitValue * sourcePrice) / targetUnitValue;
            };

            if (!!customPriceConvertationCallback) {
                priceConvertationCallback = customPriceConvertationCallback;
            }

            newCondition.priceCondition.price = Math.round(priceConvertationCallback(sourceUnitValue, targetUnitValue, sourceCondition.priceCondition.price) * 10000) / 10000 || 0;
            newCondition.priceCondition.information_price = Math.round(priceConvertationCallback(sourceUnitValue, targetUnitValue, sourceCondition.priceCondition.information_price) * 10000) / 10000 || 0;
            newCondition.priceCondition.minimal_payment_price = sourceCondition.priceCondition.minimal_payment_price || 0

        }

        newCondition.priceCondition.group_num = target.groupNum;

        return newCondition
    }
}