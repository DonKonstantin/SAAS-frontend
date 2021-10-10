import {SearchResult} from "../locationsAndTerminalSearchService/types";

/**
 * локация/терминал в поиске
 */
export type SearchItem = {
    id: string;
    type: "location" | "terminal";
    visibleName: string;
    parentId: string | null;
    symbolCode: string;
    localizedNames: string[]
}

/**
 * Элемент ветки локаций
 */
export interface BranchItem extends SearchItem {
    subItems: SearchItem[]
}

/**
 * Процессор для поиска веток локаций
 */
export interface _LocationsBranchServiceProcessorInterface {
    /**
     * Проверка доступности процессора
     * @param type
     */
    isAvailable(type: "location" | "terminal"): boolean

    /**
     * Поиск ветки локаций процессором
     * @param items
     */
    GetBranch(items: SearchResult[]): Promise<BranchItem[]>
}

/**
 * Сервис поиска веток локаций по поисковому запросу
 */
export interface LocationsBranchServiceInterface {
    /**
     * Поиск веток по поисковой строке
     */
    SearchBranches(searchString: string): Promise<BranchItem[]>

    /**
     * Получение значения по переданному ID и типу сущности
     * @param id
     * @param type
     */
    GetItemByValue(id: string, type: "location" | "terminal"): Promise<BranchItem>
}
