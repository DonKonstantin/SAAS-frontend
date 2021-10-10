import {AbstractOfferConditionsUniqueStep} from "./AbstractOfferConditionsUniqueStep";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {Shoulder, ShoulderOffer} from "../shoulderImportTaskService/shoulderTypes";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Subject} from "rxjs";
import {_StepProcessingResult} from "./interfaces";

/**
 * Уникализация условий ЦП предложений плеча
 */
export class UniqueShoulderOfferConditions extends AbstractOfferConditionsUniqueStep {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Уникализация условий ЦП предложения";
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
                            offer.offer_conditions.value = this.getUniqueOfferConditions(
                                offer.offer_conditions.value || []
                            );

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