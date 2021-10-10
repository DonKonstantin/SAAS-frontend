// Результат поискового запроса
export type SearchResult = {
    entityId: string
    entityType: string
}

/**
 * Сервис фонетического поиска сущностей
 */
export interface PhoneticSearchServiceInterface {
    /**
     * Фонетический поиск сущностей по переданному названию и коду
     * @param searchPhrase
     * @param entityTypes
     */
    search(searchPhrase: string, entityTypes?: string[]): Promise<SearchResult[]>
}