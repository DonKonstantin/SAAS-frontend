import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder, ShoulderOffer} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Subject} from "rxjs";

/**
 * Удаление ЦП плеча без ImportId
 */
export class RemoveShoulderOffersWithoutImportId implements ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Удаление ЦП плеча без ImportId"
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
                const shoulderOffers: Values<ShoulderOffer>[] = [];
                for (let offer of shoulder.offers.value || []) {
                    if (!offer.import_id.value) {
                        continue;
                    }

                    shoulderOffers.push(offer);
                }

                shoulder.offers = {
                    value: shoulderOffers,
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