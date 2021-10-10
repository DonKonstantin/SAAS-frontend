import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {
    AllowanceOffer,
    Shoulder,
    ShoulderOffer,
    ShoulderOfferCondition
} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Subject} from "rxjs";

/**
 * Удаление условий ЦП без ImportId
 */
export class RemoveOfferConditionsWithoutImportId implements ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Удаление условий ЦП без ImportId"
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
                    const offerConditions: Values<ShoulderOfferCondition>[] = [];
                    for (let condition of offer.offer_conditions.value || []) {
                        if (!condition.import_id.value) {
                            continue;
                        }

                        offerConditions.push(condition);
                    }

                    offer.offer_conditions = {
                        value: offerConditions,
                    };

                    for (let allowance of (offer.allowance_offers.value || []) as Values<AllowanceOffer>[]) {
                        const offerConditions: Values<ShoulderOfferCondition>[] = [];
                        for (let condition of allowance.offer_conditions.value || []) {
                            if (!condition.import_id.value) {
                                continue;
                            }

                            offerConditions.push(condition);
                        }

                        allowance.offer_conditions = {
                            value: offerConditions,
                        };
                    }
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