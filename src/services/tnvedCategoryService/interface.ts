import {Subject} from "rxjs";
import {FetchResult} from "@apollo/client";
import {SubscribeToCategoryChangesQueryResponse} from "./SubscribeToCategoryChangesQuery";

// Категория ТНВЭД для компании
export type TnvedCategory = {
    code: string
    company_id: number
    id: string
    name: string[]
};

// Сервис для обработки категорий ТНВЭД
export interface TnvedCategoryServiceInterface {
    // Поиск категории по переданному коду ТНВЭД
    SearchTnvedCategoryByCode(code: string[], companyId: number): Promise<TnvedCategory[]>

    // Поиск категорий по переданной строке поиска
    SearchTnvedCategoryByString(searchString: string, companyId: number): Promise<TnvedCategory[]>

    // Подписка на события изменения категорий ТНВЭД
    SubscribeToCategoryChanges(): Subject<FetchResult<SubscribeToCategoryChangesQueryResponse>>

    // Создание категории ТНВЭД
    CreateCategory(category: TnvedCategory): Promise<TnvedCategory>

    // Обновление категории ТНВЭД
    UpdateCategory(category: TnvedCategory): Promise<TnvedCategory>

    // Загрузка категорий ТНВЭД по переданному списку ID
    LoadTnvedCategoriesById(id: string[], companyId: number): Promise<TnvedCategory[]>
}
