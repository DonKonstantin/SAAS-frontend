import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder, ShoulderStep} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Subject} from "rxjs";

/**
 * Удаление шагов плеча без ImportId
 */
export class RemoveShoulderStepsWithoutImportId implements ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Удаление шагов плеча без ImportId"
    }

    /**
     * Парсинг текущих данных по переданной конфигурации
     * @param _
     * @param previousResult
     * @param __
     */
    parseData(
        _: { [p: string]: string[][] },
        previousResult: Values<Shoulder>[],
        __: ImportShoulderConfiguration
    ): _StepProcessingResult {
        const subject$ = new Subject<number>();
        const callback = async () => {
            let count = 0;
            for (let shoulder of previousResult) {
                const shoulderSteps: Values<ShoulderStep>[] = [];
                for (let step of shoulder.shoulder_steps.value || []) {
                    if (!step.import_id.value) {
                        continue;
                    }

                    shoulderSteps.push(step);
                }

                shoulder.shoulder_steps = {
                    value: shoulderSteps,
                };

                count++;

                subject$.next(Math.round(count / previousResult.length * 100));
            }

            subject$.complete();

            return previousResult;
        };

        return {
            callback,
            status: subject$,
        };
    }
}