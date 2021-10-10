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
 * Компановка ценовых предложений плеча
 */
export class CompareShoulderOffers implements ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Компановка ценовых предложений";
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
            for (let shoulder of previousResult) {
                count++;
                let newOffers: Values<ShoulderOffer>[] = [...(shoulder.offers.value || [])];

                let i = 0;
                while (i < newOffers.length) {
                    const offer = newOffers[i];
                    [...newOffers].map((nextOffer, index) => {
                        if (index === i || !this.isOffersCompatible(nextOffer, offer)) {
                            return
                        }

                        newOffers = [...newOffers.slice(0, index), ...newOffers.slice(index + 1)];
                        offer.offer_conditions.value = [
                            ...(offer.offer_conditions.value || []),
                            ...(nextOffer.offer_conditions.value || []),
                        ]
                    });

                    i++;
                }

                shoulder.offers.value = newOffers;

                subject$.next(Math.round(count / previousResult.length * 100))
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
     * Совместимы ли ЦП
     * @param a
     * @param b
     */
    private isOffersCompatible(a: Values<ShoulderOffer>, b: Values<ShoulderOffer>): boolean {
        const {import_id: _, offer_conditions: __, allowance_offers: _____, ...valuesA} = a;
        const {import_id: ___, offer_conditions: ____, allowance_offers: ______, ...valuesB} = b;

        const valuesAOffers = this.getAllowances(a);
        const valuesBOffers = this.getAllowances(b);

        return JSON.stringify([valuesA, valuesAOffers]) === JSON.stringify([valuesB, valuesBOffers])
    }

    /**
     * Получение данных надбавок для проверки эквивалентности ЦП
     * @param offer
     */
    private getAllowances(offer: Values<ShoulderOffer>): Partial<Values<AllowanceOffer>> {
        return (offer.allowance_offers.value || []).map((o: Values<AllowanceOffer>) => {
            const {import_id: _, offer_conditions: conditions, ...offer} = o;
            return {
                ...offer,
                offer_conditions: {
                    value: (conditions.value || []).map((condition: Values<ShoulderOfferCondition>) => {
                        const {import_id: _, ...data} = condition;
                        return {...data}
                    })
                }
            }
        });
    }
}