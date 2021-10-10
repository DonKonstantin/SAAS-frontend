import {
    GenerateSpecificationDataResult,
    GenerationParameters,
    ParsingParameters,
    PrepareDataResult,
    specificationParametersNames,
    TnvedSpecificationParsingServiceInterface
} from "./interface";
import {Subject} from "rxjs";
import {isNumeric} from "rxjs/internal-compatibility";
import {throttleTime} from "rxjs/operators";

// Сервис парсинга базовых данных спецификации ТНВЭД
export class TnvedSpecificationParsingService implements TnvedSpecificationParsingServiceInterface {
    /**
     * Парсинг базовых данных и формирование контента для импорта
     * @param baseData
     * @param parameters
     */
    PrepareData(baseData: string[][], parameters: ParsingParameters): PrepareDataResult {
        const subject$ = new Subject<number>();
        const callback = async () => {
            let processed = 0;
            let result: string[][] = [];

            for (let row of baseData) {
                await new Promise(resolve => {
                    const parameterKeyToParse = Object.keys(specificationParametersNames) as (keyof ParsingParameters)[];
                    const processedRow = (new Array(parameterKeyToParse.length)).fill("");

                    parameterKeyToParse.forEach((key, i) => {
                        if (isNumeric(parameters[key]) && (parameters[key] as number) >= 0) {
                            processedRow[i] = row[parameters[key] as number]
                        }
                    });

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
            subject: subject$.pipe(throttleTime(10)),
        };
    }

    /**
     * Валидация параметров парсинга
     * @param baseData
     * @param parameters
     */
    ValidateParsingParameters(baseData: string[][], parameters: ParsingParameters): ParsingParameters {
        const MAX_COLUMN = baseData[0].length;

        const validatedResult = {...parameters};
        const parameterKeyToParse = Object.keys(specificationParametersNames) as (keyof ParsingParameters)[];

        parameterKeyToParse.forEach(key => {
            if ((validatedResult[key] || -1) > MAX_COLUMN) {
                validatedResult[key] = undefined;
            }
        });

        return validatedResult
    }

    /**
     * Генерация данных спецификации по переданным параметрам
     * @param baseData
     * @param params
     */
    GenerateSpecificationData(baseData: string[][], params: GenerationParameters): GenerateSpecificationDataResult {
        const subject$ = new Subject<number>();
        const callback = async () => {
            const groupedRows: {[T: string]: string[][]} = {};
            const {GroupByColumn, ColumnsToSum, Columns, GroupNameColumn} = params;

            // Группируем строки по переданной колонке группировки
            baseData.forEach(row => {
                if (!groupedRows[row[GroupByColumn]]) {
                    groupedRows[row[GroupByColumn]] = [];
                }

                groupedRows[row[GroupByColumn]].push([...row]);
            });

            // Суммируем колонки, которые требуется просуммировать для генерации итоговой строки
            Object.keys(groupedRows).forEach(rowKey => {
                const rows = groupedRows[rowKey];

                // Для начала копируем первую строку, чтоб после суммирования осталась корректная строка
                const groupRow = [...rows[0]];

                // Теперь для каждой колонки выполняем сложение данных
                ColumnsToSum.forEach(column => {
                    groupRow[column] = rows
                        .reduce((result: number, row: string[]) => {
                            return Math.round(result * 100) / 100
                                + Math.round(parseFloat(row[column]) * 100) / 100
                            ;
                        }, 0)
                        .toString()
                    ;
                });

                // Сохраняем результат группировки
                groupedRows[rowKey] = [groupRow, ...groupedRows[rowKey]]
            });

            const result: string[][] = [];

            // Теперь генерируем итоговый набор строк
            const groupKeys = Object.keys(groupedRows);
            for (let i = 0; i < groupKeys.length; i++) {
                const groupKey = groupKeys[i];

                await new Promise(resolve => {
                    const [group, ...rows] = groupedRows[groupKey];
                    const resultRows: string[][] = [];

                    // Заполняем группу
                    const groupResultRow = (new Array(11)).fill("");
                    Columns.forEach((dataIdx, col) => {
                        groupResultRow[col + 1] = group[dataIdx];
                    });

                    // Заполняем название группы, порядковый номер, код продукции, ед. изм.
                    groupResultRow[0] = `${i + 1}`;
                    groupResultRow[1] = group[GroupNameColumn];
                    groupResultRow[2] = "-";
                    groupResultRow[3] = group[GroupByColumn];
                    groupResultRow[7] = "-";

                    // Сохраняем строку группы
                    resultRows.push(groupResultRow);

                    // Генерируем строки
                    rows.forEach((row, j) => {
                        const rowResult = (new Array(11)).fill("");

                        rowResult[0] = `${i + 1}.${j + 1}`;
                        Columns.forEach((dataIdx, col) => {
                            rowResult[col + 1] = row[dataIdx];
                        });

                        // Заполняем поле для Количество (шт)
                        rowResult[7] = "шт";

                        resultRows.push(rowResult);
                    });

                    result.push(...resultRows);

                    setTimeout(resolve, 1)
                });

                subject$.next(Math.round((i + 1) / groupKeys.length * 100))
            }

            return result
        };

        return {
            callback: callback,
            subject: subject$.pipe(throttleTime(100)),
        };
    }
}