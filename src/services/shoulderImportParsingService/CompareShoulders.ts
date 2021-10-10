import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Shoulder, ShoulderStep} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Subject} from "rxjs";

/**
 * Шаг объединения дубликатов плеч в одно
 */
export class CompareShoulders implements ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Компоновка плеч";
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
            let result: Values<Shoulder>[] = [...previousResult];

            let i = 0;
            while (i < result.length) {
                const currentShoulder = result[i];
                await new Promise(resolve => {
                    setTimeout(() => {
                        [...result].map((nextShoulder, index) => {
                            if (index === i || !this.isShouldersCompatible(nextShoulder, currentShoulder)) {
                                return
                            }

                            result = [...result.slice(0, index), ...result.slice(index + 1)];
                            currentShoulder.offers.value = [
                                ...(currentShoulder.offers.value || []),
                                ...(nextShoulder.offers.value || []),
                            ]
                        });

                        resolve();
                    }, 2)
                });

                i++;

                subject$.next(Math.round(i / result.length * 100))
            }

            subject$.complete();

            return result;
        };

        return {
            callback,
            status: subject$,
        };
    }

    /**
     * Сравнение эквивалентности 2х плеч
     * @param a
     * @param b
     */
    private isShouldersCompatible(a: Values<Shoulder>, b: Values<Shoulder>): boolean {
        return JSON.stringify(this.getShoulderData(a)) === JSON.stringify(this.getShoulderData(b))
    }

    /**
     * Получение значимых для сравнения данных плеча
     * @param shoulder
     */
    private getShoulderData(shoulder: Values<Shoulder>) {
        const {
            id,
            shoulder_type,
            shoulder_steps,
            from_location_ids,
            to_location_ids,
            from_terminal_ids,
            to_terminal_ids,
            contractor_id,
            carrier_id,
            distance,
            distance_unit,
        } = shoulder;

        return {
            id,
            shoulder_type,
            shoulder_steps: (shoulder_steps.value || []).map((step: Values<ShoulderStep>) => {
                const {id, start_terminal_id, end_terminal_id, transport_type_id, position} = step;
                return {id, start_terminal_id, end_terminal_id, transport_type_id, position}
            }),
            from_location_ids,
            to_location_ids,
            from_terminal_ids,
            to_terminal_ids,
            contractor_id,
            carrier_id,
            distance,
            distance_unit,
        }
    }
}