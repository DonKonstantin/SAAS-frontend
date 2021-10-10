import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {Subject} from "rxjs";

/**
 * Удаление локаций для некоторых типов плеч
 */
export class RemoveShoulderLocationsForSomeShoulderTypes implements ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Удаление локаций"
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
                if (["1", "2", "3"].indexOf(shoulder.shoulder_type.value) !== -1) {
                    shoulder.from_location_ids = {value: []};
                    shoulder.to_location_ids = {value: []};
                }

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