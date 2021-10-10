import {AbstractOfferConditionsUniqueStep} from "./AbstractOfferConditionsUniqueStep";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {AllowanceOffer, Shoulder, ShoulderOffer} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Subject} from "rxjs";
import {_StepProcessingResult} from "./interfaces";

/**
 * Уникализация условий надбавок ЦП предложений плеча
 */
export class UniqueAllowanceOfferConditions extends AbstractOfferConditionsUniqueStep {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Уникализация условий надбавок ЦП предложения";
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
        __: ImportShoulderConfiguration,
    ): _StepProcessingResult {
        const subject$ = new Subject<number>();
        const callback = async () => {
            let count = 0;
            const result = [...previousResult];

            for (let shoulder of result) {
                let newOffers: Values<ShoulderOffer>[] = [...(shoulder.offers.value || [])];

                for (let offer of newOffers) {
                    await new Promise(resolve => {
                        setTimeout(() => {
                            const allowances: Values<AllowanceOffer>[] = [...(offer.allowance_offers.value || [])];
                            for (let allowance of allowances) {
                                allowance.offer_conditions.value = this.getUniqueOfferConditions(
                                    allowance.offer_conditions.value || []
                                );
                            }

                            offer.allowance_offers.value = allowances;

                            resolve()
                        }, 2)
                    });
                }

                shoulder.offers.value = newOffers;

                count++;

                subject$.next(Math.round(count / previousResult.length * 100));
            }

            return result
        };

        return {
            callback,
            status: subject$,
        };
    }
}