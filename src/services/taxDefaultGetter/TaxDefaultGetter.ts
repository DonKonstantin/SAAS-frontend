import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {TaxDefaultGetterInterface} from "./interface";
import {TaxDefaultGetterQuery, TaxDefaultGetterQueryResponse} from "./TaxDefaultGetterQuery";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";

/**
 * Сервис получения дефолтного значения налога
 */
export class TaxDefaultGetter implements TaxDefaultGetterInterface {
    private readonly client: GraphQLClient
    private readonly logger: Logger = loggerFactory().make(`TaxDefaultGetter`)

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    /**
     * Получение налога по умолчанию
     */
    async getDefaultTax(): Promise<number | null> {
        try {
            const response = await this.client.Query<null, TaxDefaultGetterQueryResponse>(new TaxDefaultGetterQuery(), {})
            this.logger.Debug(`Loaded tax data`, response)

            if (0 === response.tax.length) {
                return null
            }

            const id = parseInt(response.tax[0].id)
            this.logger.Debug(`Returned tax ID`, id)

            return id
        } catch (e) {
            return null
        }
    }
}