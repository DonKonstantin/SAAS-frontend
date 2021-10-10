import {NullableTerminalLoaderInterface} from "./interface";
import {GraphQLClient} from "../../../graphQLClient/GraphQLClient";
import {Logger} from "../../../logger/Logger";
import {loggerFactory} from "../../../logger";
import {NullableTerminalLoaderQuery, NullableTerminalResponse} from "./NullableTerminalLoaderQuery";

/**
 * Сервис поиска нулевых терминалов по локациям
 */
export class NullableTerminalLoader implements NullableTerminalLoaderInterface {
    private client: GraphQLClient;
    private logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     */
    constructor(client: GraphQLClient) {
        this.client = client;
        this.logger = loggerFactory().make(`NullableTerminalLoader`)
    }

    /**
     * Поиск нулевых терминалов в переданном списке локаций
     * @param locations
     */
    async LoadTerminalIds(locations: string[]): Promise<string[]> {
        try {
            const response = await this.client.Query<{ id: string[] }, NullableTerminalResponse>(
                new NullableTerminalLoaderQuery(locations),
                {},
            );

            this.logger.Debug(`Loaded nullable terminals`, response);

            return response.data.map(data => data.id)
        } catch (e) {
            this.logger.Debug(`Failed to load nullable terminals`, e);

            return [];
        }
    }
}