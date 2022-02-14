import {
    NotificationChannel,
    NotificationServiceInterface,
    RenderNotificationQueryResponse,
    RenderNotificationQueryVariables, SendNotificationQueryResponse, SendNotificationQueryVariables
} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";
import {RenderNotificationQuery} from "./graphQlQueries/RenderNotificationQuery";
import {SendNotificationQuery} from "./graphQlQueries/SendNotificationQuery";

/**
 * Сервис для работы с оповещениями
 */
export default class NotificationService implements NotificationServiceInterface {
    private readonly client: GraphQLClient = graphQLClient();
    private readonly logger: Logger = loggerFactory().make("NotificationService");

    /**
     * Генерация сообщения
     * @param templateString
     * @param templateVariables
     */
    async render(templateString: string, templateVariables: Object): Promise<string> {
        try {
            const {template: {template}} = await this.client.Query<RenderNotificationQueryVariables, RenderNotificationQueryResponse>(
                new RenderNotificationQuery(templateString, templateVariables), {}
            )

            this.logger.Debug("render notification template", template);

            return template;
        } catch (e) {
            this.logger.Error(e)
            throw e;
        }
    }

    /**
     * Тестовая отправка оповещения
     * @param templateId
     * @param templateVariables
     * @param channel
     */
    async send(templateId: number, templateVariables: Object, channel: NotificationChannel): Promise<boolean> {
        try {
            const {result: {success}} = await this.client.Query<SendNotificationQueryVariables, SendNotificationQueryResponse>(
                new SendNotificationQuery(templateId, templateVariables, channel), {}
            )

            this.logger.Debug("send notification", success);

            return success;
        } catch (e) {
            this.logger.Error(e)
            throw e;
        }
    }
}
