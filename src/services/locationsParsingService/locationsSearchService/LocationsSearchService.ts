import {Location, LocationsSearchServiceInterface} from "./interface";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../logger/Logger";
import {
    LocationsSearchByTargetFieldQuery,
    LocationsSearchByTargetFieldQueryResponse,
    LocationsSearchQuery,
    LocationsSearchQueryResponse
} from "./LocationsSearchQuery";
import {LocationToImport} from "../types";

/**
 * Сервис поиска локаций по переданным символьным кодам
 */
export class LocationsSearchService implements LocationsSearchServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`LocationsSearchService`);
    }

    /**
     * Поиск локаций по переданным ID импорта
     * @param id
     */
    async SearchByImportId(id: string[]): Promise<Location[]> {
        try {
            if (0 === id.length) {
                return [];
            }

            const resp = await this.client.Query<{ codes: string[] }, LocationsSearchQueryResponse>(new LocationsSearchQuery(id), {});
            this.logger.Debug(`Loaded locations`, resp.result);

            return resp.result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }

    /**
     * Поиск локаций по переданному целевому полю
     * @param targetField
     * @param values
     */
    async SearchByTargetField<T extends keyof LocationToImport>(targetField: T, values: string[]): Promise<({ id: string, default_name: string } & { [K in T]: string })[]> {
        try {
            if (0 === values.length) {
                return [];
            }

            const resp = await this.client.Query<null, LocationsSearchByTargetFieldQueryResponse<T>>(
                new LocationsSearchByTargetFieldQuery(targetField, values),
                {}
            );
            this.logger.Debug(`Loaded locations`, resp.result);

            return resp.result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return [];
        }
    }
}