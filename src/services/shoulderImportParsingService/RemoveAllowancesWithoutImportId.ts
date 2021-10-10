import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {AllowanceOffer, Shoulder, ShoulderOffer} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Subject} from "rxjs";

/**
 * Удаление надбавок без ImportId
 */
export class RemoveAllowancesWithoutImportId implements ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Удаление надбавок без ImportId"
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
                for (let offer of (shoulder.offers.value || [] as Values<ShoulderOffer>[])) {
                    const allowances: Values<AllowanceOffer>[] = [];
                    for (let allowance of offer.allowance_offers.value) {
                        if (!allowance.import_id.value) {
                            continue;
                        }

                        allowances.push(allowance);
                    }

                    offer.allowance_offers = {
                        value: allowances,
                    };
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