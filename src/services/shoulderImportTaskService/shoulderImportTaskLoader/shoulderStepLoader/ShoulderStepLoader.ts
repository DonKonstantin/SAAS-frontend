import {ShoulderStepLoaderInterface} from "./interface";
import {GraphQLClient} from "../../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../../logger/Logger";
import {ShoulderStep} from "../../shoulderTypes";
import {ShoulderStepLoaderQuery, ShoulderStepLoaderQueryResponse} from "./ShoulderStepLoaderQuery";

/**
 * Сервис загрузки шагов плеч
 */
export class ShoulderStepLoader implements ShoulderStepLoaderInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`ShoulderStepLoader`);
    }

    /**
     * Загрузка шагов плеч из импорта для переданного списка id
     * @param ids
     */
    async Load(ids: string[]): Promise<ShoulderStep[]> {
        try {
            if (0 === ids.length) {
                return [];
            }

            const query = new ShoulderStepLoaderQuery(ids);
            this.logger.Debug(`Created shoulder steps load query`, query);

            const resp = await this.client.Query<{ids: string[]}, ShoulderStepLoaderQueryResponse>(
                query,
                {}
            );
            this.logger.Debug(`Loaded shoulder steps by ID`, resp.result);

            return resp.result
        } catch(e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }
}