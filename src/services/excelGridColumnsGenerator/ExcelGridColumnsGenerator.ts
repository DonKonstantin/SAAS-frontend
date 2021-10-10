import {Column, ExcelGridColumnsGeneratorInterface} from "./interface";

/**
 * Сервис генерации колонок для таблиц Excel
 */
export class ExcelGridColumnsGenerator implements ExcelGridColumnsGeneratorInterface {
    /**
     * Генерация колонок по переданному ограничению
     * @param limit
     */
    GenerateColumns(limit: number): Column[] {
        let result: Column[] = [];
        for (let i = 0; i < limit; i++) {
            result.push({
                name: this.getColumnByIndex(i),
                index: i,
            } as Column)
        }

        return result;
    }

    /**
     * Получение символьного кода колонки по переданному индексу
     * @param index
     */
    getColumnByIndex(index: number): string {
        let column = ``;
        let subColumn = 0;
        if (index >= 26) {
            subColumn = Math.floor(index / 26);
            column = this.getColumnByIndex(subColumn - 1);
        }

        // Вычитаем родительский индекс для колонки
        index -= subColumn * 26;

        return `${column}${String.fromCharCode(97 + index)}`
    }
}