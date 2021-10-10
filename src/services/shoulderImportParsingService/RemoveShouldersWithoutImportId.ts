import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Subject} from "rxjs";

/**
 * Удаление плеч без ImportId
 */
export class RemoveShouldersWithoutImportId implements ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Удаление плеч без ImportId"
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
            const shoulders: Values<Shoulder>[] = [];

            for (let shoulder of previousResult) {
                if (!shoulder.import_id.value) {
                    continue;
                }

                shoulders.push(shoulder);

                count++;

                subject$.next(Math.round(count / previousResult.length * 100));
            }

            subject$.complete();

            return shoulders;
        };

        return {
            callback,
            status: subject$,
        };
    }
}