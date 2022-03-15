import {LoadLogsParams, LogItem, LogsFilterParams, LogsLevel, SystemLogsServiceInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";
import {LogsListQuery, LogsListQueryParams, LogsListQueryResponse} from "./query/LogsListQuery";
import {logsDTOFactory} from "./LogItemDTO";
import {LogsQuantityQuery, LogsQuantityQueryParams, LogsQuantityQueryResponse} from "./query/LogsQuantityQuery";

// Сервис для работы с логами системы
export default class SystemLogsService implements SystemLogsServiceInterface {
    private readonly logger: Logger = loggerFactory().make("LogsService");
    private readonly client: GraphQLClient;

    constructor(client: GraphQLClient) {
        this.client = client;
    }

    /**
     * Получение логов
     * @param params
     */
    async Load(params: LoadLogsParams): Promise<LogItem[]> {
        this.logger.Debug("Load logs by params", params)

        try {
            const {logs} = await this.client.Query<LogsListQueryParams, LogsListQueryResponse>(
                new LogsListQuery(params), {}
            )

            return logsDTOFactory(logs);
        } catch (e) {
            this.logger.Error(e);

            throw new Error(e);
        }
    }

    // получение общего количества логов с выбранными условиями фильтрации
    async LoadQuantity(structureId: string, level: LogsLevel, filter: LogsFilterParams): Promise<number> {
        this.logger.Debug("Load logs count", structureId, level, filter)

        try {
            const {count} = await this.client.Query<LogsQuantityQueryParams, LogsQuantityQueryResponse>(
                new LogsQuantityQuery({
                    level,
                    structureId,
                    filter
                }), {}
            )

            return count;
        } catch (e) {
            this.logger.Error(e);

            throw new Error(e);
        }
    }


}
