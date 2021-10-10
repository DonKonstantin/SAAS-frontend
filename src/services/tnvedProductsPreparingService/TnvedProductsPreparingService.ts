import {ParsingParameters, PrepareDataResult, TnvedProductsPreparingServiceInterface} from "./interface";
import {interval, Subject} from "rxjs";
import {isNumeric} from "rxjs/internal-compatibility";
import {throttle} from "rxjs/operators";

// Сервис парсинга базовых данных импорта товаров ТНВЭД
export class TnvedProductsPreparingService implements TnvedProductsPreparingServiceInterface {
    /**
     * Парсинг базовых данных и формирование контента для импорта
     * @param baseData
     * @param parameters
     */
    PrepareData(baseData: string[][], parameters: ParsingParameters): PrepareDataResult {
        const {
            sku,
            name,
            tnvedCode,
            categoryCode,
            categoryName,
        } = parameters;

        const subject$ = new Subject<number>();
        const callback = async () => {
            let processed = 0;
            let result: string[][] = [];

            for (let row of baseData) {
                await new Promise(resolve => {
                    const processedRow = [
                        "", // sku
                        "", // name
                        "", // tnvedCode
                        "", // tnvedName
                        "", // categoryCode
                        "", // categoryName
                    ];

                    if (isNumeric(sku) && sku >= 0) {
                        processedRow[0] = row[sku]
                    }

                    if (isNumeric(name) && name >= 0) {
                        processedRow[1] = row[name]
                    }

                    if (isNumeric(tnvedCode) && tnvedCode >= 0) {
                        processedRow[2] = row[tnvedCode]
                    }

                    if (isNumeric(categoryCode) && categoryCode >= 0) {
                        processedRow[4] = row[categoryCode]
                    }

                    if (isNumeric(categoryName) && categoryName >= 0) {
                        processedRow[5] = row[categoryName]
                    }

                    result.push(processedRow);

                    // Таймаут нужен для того, чтоб не блочить основной процесс.
                    setTimeout(() => {
                        processed++;
                        subject$.next(Math.round(processed / baseData.length * 100));

                        resolve()
                    }, 1)
                })
            }

            return result
        };

        return {
            callback: callback,
            subject: subject$.pipe(throttle(() => interval(100))),
        };
    }
}