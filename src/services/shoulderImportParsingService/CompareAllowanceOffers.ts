import {_StepProcessingResult, ShoulderImportParsingStepInterface} from "./interfaces";
import {AllowanceOffer, Shoulder, ShoulderOffer} from "../shoulderImportTaskService/shoulderTypes";
import {Values} from "./baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {ImportShoulderConfiguration} from "../shoulderImportTaskService/interfaces";
import {Subject} from "rxjs";

/**
 * Шаг компановки надбавок для ценовых предложений
 */
export class CompareAllowanceOffers implements ShoulderImportParsingStepInterface {
    /**
     * Получение названия шага парсинга
     */
    getName(): string {
        return "Компановка надбавок";
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

            for (let i = 0; i < previousResult.length; i++) {
                const shoulder = previousResult[i];

                const newOffers: Values<ShoulderOffer>[] = [];
                for (let offer of ((shoulder.offers.value || []) as Values<ShoulderOffer>[])) {
                    await new Promise(resolve => {
                        setTimeout(() => {
                            this.compareAllowancesForOffer(offer).then(offer => {
                                newOffers.push(offer);

                                resolve();
                            });
                        }, 2)
                    })
                }

                shoulder.offers.value = newOffers;

                subject$.next(Math.round(i / previousResult.length * 100))
            }

            subject$.complete();

            return result;
        };

        return {
            callback,
            status: subject$,
        }
    }

    /**
     * Компановка надбавок в отдельно взятом ценовом предложении
     * @param offer
     */
    private async compareAllowancesForOffer(offer: Values<ShoulderOffer>): Promise<Values<ShoulderOffer>> {
        const result: Values<ShoulderOffer> = JSON.parse(JSON.stringify(offer));

        let allowances: Values<AllowanceOffer>[] = result.allowance_offers.value || [];

        let i = 0;
        while (i < allowances.length) {
            const allowance = allowances[i];
            [...allowances].map((nextAllowance, index) => {
                if (index === i || !this.isAllowancesCompatible(nextAllowance, allowance)) {
                    return
                }

                allowances = [...allowances.slice(0, index), ...allowances.slice(index + 1)];
                allowance.offer_conditions.value = [
                    ...(allowance.offer_conditions.value || []),
                    ...(nextAllowance.offer_conditions.value || []),
                ]
            });

            i++;
        }

        return result
    }

    /**
     * Совместимы ли надбавки
     * @param a
     * @param b
     */
    private isAllowancesCompatible(a: Values<AllowanceOffer>, b: Values<AllowanceOffer>): boolean {
        const {import_id: _, offer_conditions: __, ...valuesA} = a;
        const {import_id: ___, offer_conditions: ____, ...valuesB} = b;

        return JSON.stringify(valuesA) === JSON.stringify(valuesB)
    }
}