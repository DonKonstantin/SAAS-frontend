/**
 * Сервис поиска нулевых терминалов по локациям
 */
export interface NullableTerminalLoaderInterface {
    /**
     * Поиск нулевых терминалов в переданном списке локаций
     * @param locations
     */
    LoadTerminalIds(locations: string[]): Promise<string[]>
}