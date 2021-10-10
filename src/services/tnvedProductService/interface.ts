// Товар ТНВЭД наменклатуры
export type TnvedProduct = {
    category_id: number
    company_id: number
    id: string
    name: string[]
    sku: string
    tnved_code: string
};

// Сервис для работы с товарами ТНВЭД
export interface TnvedProductServiceInterface {
    // Получение списка товаров по переданному списку артикулов
    GetProductsBySku(sku: string[], companyId: number): Promise<TnvedProduct[]>
}