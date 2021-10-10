import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder, ShoulderOfferCondition} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";

/**
 * Абстрактный шаг для уникализации условий ценовых предложений
 */
export abstract class AbstractOfferConditionsUniqueStep implements ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    abstract getName(): string;

    /**
     * Парсинг текущих данных по переданной конфигурации
     * @param data
     * @param previousResult
     * @param configuration
     */
    abstract parseData(
        data: { [p: string]: string[][] },
        previousResult: Values<Shoulder>[],
        configuration: ImportShoulderConfiguration
    ): _StepProcessingResult

    /**
     * Получение уникальных условий ЦП
     * @param conditions
     */
    protected getUniqueOfferConditions(conditions: Values<ShoulderOfferCondition>[]): Values<ShoulderOfferCondition>[] {
        const resultHash: string[] = [];
        const result: Values<ShoulderOfferCondition>[] = [];

        for (let condition of conditions) {
            const {import_id: _, ...hashProps} = condition;
            const hash = JSON.stringify(hashProps);

            if (resultHash.indexOf(hash) !== -1) {
                continue
            }

            resultHash.push(hash);
            result.push(condition);
        }

        return result
    }
}