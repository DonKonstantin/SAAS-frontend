// Колонка таблицы
export type Column = {
    name: string
    index: number
};

/**
 * Сервис генерации колонок для таблиц Excel
 */
export interface ExcelGridColumnsGeneratorInterface {
    /**
     * Генерация колонок по переданному ограничению
     * @param limit
     */
    GenerateColumns(limit: number): Column[]
}