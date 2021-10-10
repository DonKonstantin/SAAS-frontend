import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder, ShoulderOfferCondition} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";

/**
 * Абстрактный шаг разделения условий ценовых предложений по группам
 */
export abstract class AbstractOfferConditionsGroupStep implements ShoulderImportParsingStepInterface {
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
    protected groupOfferConditions(
        conditions: Values<ShoulderOfferCondition>[],
    ): Values<ShoulderOfferCondition>[] {
        const unitGroups: { [T: string]: number } = {};
        let lastUnitGroup: number = 0;

        for (let condition of conditions) {
            const unitId = `${condition.unit_id.value}`;
            if (unitGroups[unitId] === undefined) {
                lastUnitGroup++;
                unitGroups[unitId] = lastUnitGroup;
            }

            condition.group_num = {
                value: unitGroups[unitId],
            }
        }

        return conditions
    }
}