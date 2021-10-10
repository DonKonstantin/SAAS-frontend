import {
    ParsingResult,
    ProcessingStatus,
    ShoulderImportParsingServiceInterface,
    ShoulderImportParsingStepInterface
} from "./interfaces";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Subject} from "rxjs";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder} from "../shoulderImportTaskService/shoulderTypes";
import {bufferTime} from "rxjs/operators";

/**
 * Сервис парсинга сырых данных по переданной конфигурации
 */
export class ShoulderImportParsingService implements ShoulderImportParsingServiceInterface {
    private readonly steps: ShoulderImportParsingStepInterface[];

    /**
     * Конструктор сервиса
     * @param steps
     */
    constructor(...steps: ShoulderImportParsingStepInterface[]) {
        this.steps = steps;
    }

    /**
     * Парсинг текущих данных по переданной конфигурации
     * @param data
     * @param configuration
     */
    parseData(
        data: { [T in string]: string[][] },
        configuration: ImportShoulderConfiguration,
    ): ParsingResult {
        const subject$ = new Subject<ProcessingStatus>();
        return {
            subscription: subject$,
            process: async () => {
                let result: Values<Shoulder>[] = [];

                for (let step of this.steps) {
                    subject$.next({
                        step: step.getName(),
                        progress: 0
                    });

                    const {callback, status} = step.parseData(data, result, configuration);
                    const subscription = status.pipe(bufferTime(100)).subscribe({
                        next: value => {
                            if (value.length === 0) {
                                return
                            }

                            subject$.next({
                                step: step.getName(),
                                progress: value[value.length - 1]
                            })
                        },
                    });

                    result = await callback();

                    subscription.unsubscribe();
                    subject$.next({
                        step: step.getName(),
                        progress: 100,
                    })
                }

                subject$.complete();
                return {
                    shoulders: result
                };
            },
        }
    }
}