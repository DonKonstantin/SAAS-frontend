/**
 * Сервис получения дефолтных валют
 */
export interface CurrencyDefaultGetterInterface {
    /**
     * Получение дефолтной валюты для транспорта
     */
    getDefaultForTransport(): Promise<string | null>

    /**
     * Получение дефолтной валюты для доп. услуг
     */
    getDefaultForServices(): Promise<string | null>
}