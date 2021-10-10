import {TnvedCode, TnvedCodeBranchLoaderInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {TnvedCodeBranchLoaderQuery, TnvedCodeBranchLoaderQueryResponse} from "./TnvedCodeBranchLoaderQuery";

/**
 * Сервис загрузки веток кодов ТНВЭД
 */
export class TnvedCodeBranchLoader implements TnvedCodeBranchLoaderInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`TnvedCodeBranchLoader`);
    }

    /**
     * Загрузка веток по переданным ID
     * @param ids
     */
    async LoadBranchesByIds(ids: string[]): Promise<TnvedCode[]> {
        try {
            const result = await this.client.Query<{id: string[]}, TnvedCodeBranchLoaderQueryResponse>(
                new TnvedCodeBranchLoaderQuery(ids),
                {}
            );
            this.logger.Debug(`Loaded TNVED branches`, result);

            return result.result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);

            throw new Error(`Failed to load TNVED branches`)
        }
    }
}