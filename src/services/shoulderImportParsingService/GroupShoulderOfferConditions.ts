import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder, ShoulderOffer} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {AbstractOfferConditionsGroupStep} from "./AbstractOfferConditionsGroupStep";
import {Subject} from "rxjs";
import {_StepProcessingResult} from "./interfaces";

/**
 * Группировка условий ЦП предложений плеча
 */
export class GroupShoulderOfferConditions extends AbstractOfferConditionsGroupStep {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Группировка условий ЦП предложения";
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
            const result = [...previousResult];

            let count = 0;
            for (let shoulder of result) {
                let newOffers: Values<ShoulderOffer>[] = [...(shoulder.offers.value || [])];

                for (let offer of newOffers) {
                    await new Promise(resolve => {
                        setTimeout(() => {
                            offer.offer_conditions.value = this.groupOfferConditions(
                                offer.offer_conditions.value || []
                            );

                            resolve()
                        }, 2)
                    });
                }

                shoulder.offers.value = newOffers;

                count++;

                subject$.next(Math.round(count / result.length * 100));
            }

            subject$.complete();

            return result
        };

        return {
            callback,
            status: subject$,
        };
    }
}