import {ShoulderOfferConditionsLoaderInterface} from "./interface";
import {ShoulderOfferCondition} from "../../shoulderTypes";
import {GraphQLClient} from "../../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../../logger/Logger";
import {
    ShoulderOfferConditionsLoaderQuery,
    ShoulderOfferConditionsLoaderQueryResponse
} from "./ShoulderOfferConditionsLoaderQuery";

/**
 * Сервис загрузки данных для условий ЦП
 */
export class ShoulderOfferConditionsLoader implements ShoulderOfferConditionsLoaderInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`ShoulderImportTaskGetter`);
    }

    /**
     * Загрузка данных условий цп из импорта для переданного списка id
     * @param ids
     */
    async LoadCondition(ids: string[]): Promise<ShoulderOfferCondition[]> {
        try {
            if (0 === ids.length) {
                return [];
            }

            const query = new ShoulderOfferConditionsLoaderQuery(ids);
            this.logger.Debug(`Created offer conditions load query`, query);

            const resp = await this.client.Query<{ids: string[]}, ShoulderOfferConditionsLoaderQueryResponse>(
                query,
                {}
            );
            this.logger.Debug(`Loaded offer conditions by ID`, resp.result);

            return resp.result
        } catch(e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }
}