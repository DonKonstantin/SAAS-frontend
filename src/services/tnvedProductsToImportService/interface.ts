import {Observable, Subject} from "rxjs";
import {FetchResult} from "@apollo/client";
import {SubscribeToProductsChangesQueryResponse} from "./SubscribeToProductsChangesQuery";

// Товар ТНВЭД наменклатуры для импорта
export type TnvedProductToImport = {
    category_id: number
    company_id: number
    error: string
    id: number | null
    import_id: string
    is_processed: boolean
    name: string[]
    sku: string
    task_id: string
    tnved_code: string
};

// Результат сохранения товаров
export type StoreResult = {
    progress: Observable<number>
    run: { (): Promise<void> }
};

// Сервис для работы с товарами ТНВЭД, подготовленными для импорта
export interface TnvedProductsToImportServiceInterface {
    // Получение листинга товаров по ID задания импорта
    LoadProductsForTask(taskId: string): Promise<TnvedProductToImport[]>

    // Сохранение товаров в переданной задаче
    StoreTnvedProducts(taskId: string, products: TnvedProductToImport[]): StoreResult

    // Удаление товара из задания импорта
    DeleteTnvedProduct(taskId: string, productImportId: string): Promise<void>

    // Подписка на события изменения в товарах ТНВЭД
    SubscribeToProductsChanges(): Subject<FetchResult<SubscribeToProductsChangesQueryResponse>>
}