import {
    ImportSettingsBaseServiceInterface,
    ImportSettingsData,
    ImportSettingsInsertData,
    SubscriptionData
} from "./interfaces";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../logger/Logger";
import {
    ImportSettingsBaseServiceDeleteMutation,
    ImportSettingsBaseServiceInsertMutation,
    ImportSettingsBaseServiceInsertOrUpdateResponse, ImportSettingsBaseServiceListQuery,
    ImportSettingsBaseServiceListQueryResponse, ImportSettingsBaseServiceSubscription,
    ImportSettingsBaseServiceUpdateMutation
} from "./ImportSettingsBaseServiceQueries";
import {Unsubscribable} from "rxjs";

/**
 * Базовый сервис для работы с настройками импорта
 */
export class ImportSettingsBaseService implements ImportSettingsBaseServiceInterface {

    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`ImportSettingsBaseService`);
    }

    /**
     * Создание настройки
     * @param settings
     */
    async CreateSettings(settings: ImportSettingsInsertData): Promise<ImportSettingsData | undefined> {
        try {
            const response = await this.client.Mutation<any, ImportSettingsBaseServiceInsertOrUpdateResponse>(
                new ImportSettingsBaseServiceInsertMutation(settings),
                {},
            );

            this.logger.Debug(`Loaded data after insert`, response.response);

            return response.response.returning[0];
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }
    }

    /**
     * Удаление настроек
     * @param id
     */
    async DeleteSettingsById(id: string): Promise<void> {
        try {
            await this.client.Mutation<any, void>(
                new ImportSettingsBaseServiceDeleteMutation(id),
                {},
            );

            this.logger.Debug(`Delete query executed successfully`);

            return;
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }
    }

    /**
     * Загрузка настроек по переданному типу
     * @param settingsType
     */
    async LoadSettings(settingsType: string): Promise<ImportSettingsData[] | undefined> {
        try {
            const response = await this.client.Mutation<any, ImportSettingsBaseServiceListQueryResponse>(
                new ImportSettingsBaseServiceListQuery(settingsType),
                {},
            );

            this.logger.Debug(`Loaded list data`, response.list);

            return response.list;
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }
    }

    /**
     * Подписка на события изменения настроек импорта
     * @param callback
     */
    SubscribeChanges(callback: { (data: SubscriptionData): void }): Unsubscribable | undefined {
        try {
            const subject = this.client.Subscribe<any, SubscriptionData>(
                new ImportSettingsBaseServiceSubscription(),
            );

            const subscription = subject.subscribe(entity => {
                this.logger.Debug(`Accepted new data`, entity);
                if (!!entity.data) {
                    callback(entity.data)
                }
            });

            return {
                unsubscribe(): void {
                    subscription.unsubscribe();
                    subject.complete();
                }
            };
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }
    }

    /**
     * Обновление настроек
     * @param settings
     */
    async UpdateSettings(settings: ImportSettingsData): Promise<ImportSettingsData | undefined> {
        try {
            const response = await this.client.Mutation<any, ImportSettingsBaseServiceInsertOrUpdateResponse>(
                new ImportSettingsBaseServiceUpdateMutation(settings),
                {},
            );

            this.logger.Debug(`Loaded data after update`, response.response);

            return response.response.returning[0];
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return;
        }
    }

}