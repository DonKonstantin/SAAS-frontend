import {Schemas} from "../../settings/schema";
import {
    LoadFirstTenEntitiesParams,
    SearchUntypedLoaderInterface,
    SearchUntypedLoaderItem,
    SearchUntypedLoaderParams
} from "./interfaces";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../logger/Logger";
import {graphQLClient} from "../graphQLClient";
import {SearchUntypedLoaderQuery, SearchUntypedLoaderQueryResponse} from "./SearchUntypedLoaderQuery";
import {LoadFirstTenEntitiesQuery, LoadFirstTenEntitiesQueryResponse} from "./LoadFirstTenEntitiesQuery";
import {LoadLocalizationQuery, LoadLocalizationQueryResponse} from "./LoadLocalizationQuery";

/**
 * Сервис загрузки не типизированных сущностей
 */
export class SearchUntypedLoader<T extends keyof Schemas> implements SearchUntypedLoaderInterface<T> {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param logger
     * @param token
     */
    constructor(logger: LoggerFactory, token?: string) {
        this.logger = logger.make(`SearchUntypedLoader`);
        this.client = graphQLClient(token);
    }

    /**
     * Загрузка не типизированных данных
     * @param params
     */
    async LoadEntitiesById(params: SearchUntypedLoaderParams<T>): Promise<SearchUntypedLoaderItem<T>[]> {
        if (params.ids.length === 0) {
            return []
        }

        try {
            const response = await this.client.Query<null, SearchUntypedLoaderQueryResponse<T>>(new SearchUntypedLoaderQuery<T>(
                params.ids,
                params.schema,
                params.primaryKey,
                [...params.fieldsToLoad, ...(params.localizedFields ? params.localizedFields : [])],
            ), {});

            this.logger.Debug(`Loaded response:`, response);

            if (response.result.length === 0) {
                return []
            }

            return await this.parseResponse(response, params.localizedFields)
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return []
        }
    }

    /**
     * Загрузка первых 10 элементов
     * @param params
     */
    async LoadFirstTenEntities(params: LoadFirstTenEntitiesParams<T>): Promise<SearchUntypedLoaderItem<T>[]> {
        try {
            const response = await this.client.Query<null, LoadFirstTenEntitiesQueryResponse<T>>(new LoadFirstTenEntitiesQuery<T>(
                params.schema,
                params.primaryKey,
                [...params.fieldsToLoad, ...(params.localizedFields ? params.localizedFields : [])],
            ), {});

            this.logger.Debug(`Loaded response:`, response);

            if (response.result.length === 0) {
                return []
            }

            return await this.parseResponse(response, params.localizedFields)
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return []
        }
    }

    /**
     * Парсинг результатов базовой загрузки
     * @param response
     * @param localizedFields
     */
    async parseResponse(
        response: SearchUntypedLoaderQueryResponse<T>,
        localizedFields?: (keyof Schemas[T]['fields'])[],
    ): Promise<SearchUntypedLoaderItem<T>[]> {
        try {
            let result: SearchUntypedLoaderItem<T>[] = response.result.map(i => ({
                localizedFields: {},
                fields: i
            }));

            if (!localizedFields) {
                return result
            }

            let messages: any[] = [];
            localizedFields.map(field => {
                response.result.map(item => {
                    // @ts-ignore
                    messages = [...messages, ...(Array.isArray(item[field]) ? item[field] : [])]
                })
            });

            if (0 === messages.length) {
                return result
            }

            const langResponse = await this.client.Query<null, LoadLocalizationQueryResponse>(new LoadLocalizationQuery(messages), {});

            this.logger.Debug(`Loaded localized data:`, langResponse);

            if (0 === langResponse.result.length) {
                return result
            }

            result.map(item => {
                localizedFields.map(field => {
                    const messageIds: any[] = item.fields[field];
                    if (!Array.isArray(messageIds)) {
                        return
                    }

                    item.localizedFields[field as string] = [];
                    messageIds.map(id => {
                        const messageData = langResponse.result.find(message => {
                            return `${message.id}` === `${id}`
                        });
                        if (!!messageData) {
                            item.localizedFields[field as string].push(messageData)
                        }
                    })
                });
            });

            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return []
        }
    }
}