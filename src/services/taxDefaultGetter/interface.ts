/**
 * Сервис получения дефолтного значения налога
 */
export interface TaxDefaultGetterInterface {
    /**
     * Получение налога по умолчанию
     */
    getDefaultTax(): Promise<number | null>
}