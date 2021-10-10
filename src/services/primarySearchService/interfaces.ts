import {SearchResultStringProps} from "../../settings/search/system/types";

// Результат выполнения поискового запроса
export interface SearchResponse {
    id: string
    data: SearchResponseItem[]
}

// Элемент поисковой выдачи
export class SearchResponseItem {
    entityType: string;
    searchProps: SearchResultStringProps<any, any, any>
}

// Сервис поиска сущностей
export interface PrimarySearchServiceInterface {
    // Поиск сущностей по поисковой строке
    Search(id: string, searchString: string): Promise<SearchResponse>
}