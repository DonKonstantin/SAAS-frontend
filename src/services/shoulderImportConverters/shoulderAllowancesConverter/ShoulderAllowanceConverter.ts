import {ConvertedCondition, ShoulderAllowanceConverterInterface} from "./interface";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {AllowanceOffer as AllowanceOfferImport} from "../../shoulderImportTaskService/shoulderTypes";
import {Collection} from "../../types";
import {AllowanceOffer} from "../../allowanceService/interfaces";
import {AllowanceData} from "../../searchLoaders/allowanceLoader/AllowanceLoaderQuery";
import {AllowanceGroupData} from "../../searchLoaders/allowanceGroupsLoader/AllowanceGroupLoaderQuery";
import {ShoulderImportOfferConditionsConverterInterface} from "../shoulderImportOfferConditionsConverter/interface";
import {v4} from "uuid";

/**
 * Конвертер надбавок для ЦП
 */
export class ShoulderAllowanceConverter implements ShoulderAllowanceConverterInterface {
    private readonly shoulderImportOfferConditionsConverter: ShoulderImportOfferConditionsConverterInterface;

    /**
     * Конструктор сервиса
     * @param shoulderImportOfferConditionsConverter
     */
    constructor(shoulderImportOfferConditionsConverter: ShoulderImportOfferConditionsConverterInterface) {
        this.shoulderImportOfferConditionsConverter = shoulderImportOfferConditionsConverter;
    }

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
    ): ConvertedCondition[] {
        const result = conditions
            .map(condition => {
                const allowance = allowanceData.find(a => a.id === condition.allowance_id.value);
                if (!allowance) {
                    return undefined
                }

                const allowanceGroup = allowanceGroups.find(g => g.id === allowance.allowance_group) as AllowanceGroupData;
                const offers = this.shoulderImportOfferConditionsConverter.convertToSimpleValues(condition.offer_conditions.value || []);

                return {
                    origin: condition,
                    allowance: {
                        id: condition.id.value,
                        allowance: {
                            ...allowance,
                            allowance_group: allowanceGroup
                        },
                        isInvoiceAllowance: !!condition.is_invoice_allowance.value,
                        offerConditions: offers.map(o => o.priceCondition),
                    },
                    validation: offers.map(o => o.validation),
                }
            })
            .filter(r => !!r)
        ;

        return result as ConvertedCondition[];
    }

    /**
     * Конвертация значений из простых в сущности импорта
     * @param allowance
     * @param validation
     */
    convertFromSimpleValues(
        allowance: AllowanceOffer[],
        validation: Collection<string | undefined>[][],
    ): Values<AllowanceOfferImport>[] {
        return allowance.map((allowance, i) => {
            return {
                import_id: {value: v4()},
                id: {value: allowance.id},
                allowance_id: {value: allowance.allowance.id},
                is_invoice_allowance: {value: allowance.isInvoiceAllowance},
                offer_conditions: {
                    value: this.shoulderImportOfferConditionsConverter.convertFromSimpleValues(
                        allowance.offerConditions,
                        validation[i],
                    ),
                    error: allowance.offerConditions.length === 0 ? `Нет заполненных значений` : undefined
                }
            }
        })
    }
}