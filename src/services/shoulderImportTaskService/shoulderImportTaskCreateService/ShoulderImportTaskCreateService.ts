import {ShoulderImportTaskCreateServiceInterface} from "./interface";
import {Shoulder} from "../shoulderTypes";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../logger/Logger";
import {
    ShoulderImportTaskCreateQuery,
    ShoulderImportTaskCreateQueryResponse,
    Vars
} from "./ShoulderImportTaskCreateQuery";

/**
 * Сервис для управления заданиями импорта ставок
 */
export class ShoulderImportTaskCreateService implements ShoulderImportTaskCreateServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`ShoulderImportTaskCreateService`);
    }

    /**
     * Создание задания на импорт ставок
     * @param shoulders
     */
    async CreateTask(shoulders: Shoulder[]): Promise<string | undefined> {
        try {
            this.logger.Debug(`Started creating task for shoulders`, shoulders);
            if (0 === shoulders.length) {
                return undefined;
            }

            const query = new ShoulderImportTaskCreateQuery(shoulders);
            this.logger.Debug(`Created task creation query`, query);

            const resp = await this.client.Mutation<Vars, ShoulderImportTaskCreateQueryResponse>(
                query,
                {}
            );
            this.logger.Debug(`Created task ID`, resp.result.id);

            return resp.result.id
        } catch(e) {
            this.logger.Error(`Some error occurred`, e);
            return undefined;
        }
    }
}