import {ConvertedCondition, ShoulderImportOfferConditionsConverterInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {PriceCondition} from "../../priceConditionsService/interface";
import {Collection} from "../../types";
import {v4} from "uuid";

/**
 * Конвертер условий ЦП для импорта
 */
export class ShoulderImportOfferConditionsConverter implements ShoulderImportOfferConditionsConverterInterface {
    /**
     * Конвертация значений из простых в сущности импорта
     * @param priceCondition
     * @param validation
     */
    convertFromSimpleValues(
        priceCondition: PriceCondition[],
        validation: Collection<string | undefined>[],
    ): Values<ShoulderOfferCondition>[] {
        return priceCondition.map((priceCondition, index) => {
            // @ts-ignore
            const result: Values<ShoulderOfferCondition> = {
                import_id: {
                    value: v4(),
                },
            };
            (Object.keys(priceCondition) as (keyof PriceCondition)[]).map(key => {
                result[key] = {
                    value: priceCondition[key],
                    error: validation[index] ? validation[index][key] : undefined,
                }
            });

            return result
        });
    }

    /**
     * Конвертация значений
     * @param conditions
     */
    convertToSimpleValues(conditions: Values<ShoulderOfferCondition>[]): ConvertedCondition[] {
        return conditions.map(condition => {
            const priceCondition = new PriceCondition;
            const validation: Collection<string | undefined> = {};

            (Object.keys(condition) as (keyof ShoulderOfferCondition)[]).map(key => {
                const value = condition[key];
                if (!(key in priceCondition)) {
                    return
                }

                // @ts-ignore
                priceCondition[key] = value.value;
                validation[key] = value.error;
            });

            return {
                origin: condition,
                priceCondition: priceCondition,
                validation: validation,
            }
        });
    }
}