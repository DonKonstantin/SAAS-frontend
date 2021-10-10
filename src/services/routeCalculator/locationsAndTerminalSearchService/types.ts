/**
 * Результат выполнения поискового запроса
 */
export class SearchResult {
    type: "location" | "terminal";
    id: string;
}

/**
 * Интерфейс сервиса поиска локаций и терминалов по строке поискового запроса
 */
export interface LocationsAndTerminalSearchServiceInterface {
    /**
     * Поиск локаций и терминалов по части названия
     * @param searchString
     */
    SearchLocationsAndTerminals(searchString: string): Promise<SearchResult[]>
}