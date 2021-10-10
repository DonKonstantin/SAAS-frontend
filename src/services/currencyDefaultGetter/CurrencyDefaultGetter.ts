import {CurrencyDefaultGetterInterface} from "./interface";
import {graphQLClient} from "../graphQLClient";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {CurrencyDefaultGetterQuery, CurrencyDefaultGetterQueryResponse} from "./CurrencyDefaultGetterQuery";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";

/**
 * Сервис получения дефолтных валют
 */
export class CurrencyDefaultGetter implements CurrencyDefaultGetterInterface {
    private readonly client: GraphQLClient
    private readonly logger: Logger = loggerFactory().make(`CurrencyDefaultGetter`)

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    /**
     * Получение дефолтной валюты для доп. услуг
     */
    async getDefaultForServices(): Promise<string | null> {
        try {
            const currencies = await this.getCurrencies()
            this.logger.Debug(`Loaded currencies data`, currencies)

            if (0 === currencies.currencies.length) {
                return null
            }

            const currency = currencies.currencies.find(c => c.is_default_for_services)
            this.logger.Debug(`Found default currency`, currency)

            if (!currency) {
                return null
            }

            return currency.id
        } catch (e) {
            return null
        }
    }

    /**
     * Получение дефолтной валюты для транспорта
     */
    async getDefaultForTransport(): Promise<string | null> {
        try {
            const currencies = await this.getCurrencies()
            this.logger.Debug(`Loaded currencies data`, currencies)

            if (0 === currencies.currencies.length) {
                return null
            }

            const currency = currencies.currencies.find(c => c.is_default_for_transport)
            this.logger.Debug(`Found default currency`, currency)

            if (!currency) {
                return null
            }

            return currency.id
        } catch (e) {
            return null
        }
    }

    /**
     * Получение списка дефолтных валют
     */
    private async getCurrencies(): Promise<CurrencyDefaultGetterQueryResponse> {
        return await this.client.Query<null, CurrencyDefaultGetterQueryResponse>(new CurrencyDefaultGetterQuery(), {})
    }
}