import {LoadAllTemplatesQueryResponse, NotificationTemplate, NotificationTemplateServiceInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {Logger} from "../logger/Logger";
import {loggerFactory} from "../logger";
import LoadAllTemplatesQuery from "./query/LoadAllTemplatesQuery";

/**
 * Service for Notification Templates
 */
export default class NotificationTemplateService implements NotificationTemplateServiceInterface {
    private readonly client: GraphQLClient = graphQLClient();
    private readonly logger: Logger = loggerFactory().make("NotificationTemplateService");

    /**
     * Load all available templates
     */
    async loadAll(): Promise<NotificationTemplate[]> {
        try {
            this.logger.Debug("Load all available templates");

            const {templates} = await this.client.Query<null, LoadAllTemplatesQueryResponse>(
                new LoadAllTemplatesQuery(),
                {}
            );

            this.logger.Debug("Loaded templates", templates);

            return  templates;
        } catch (e) {
            this.logger.Error(e);

            throw e;
        }
    }
}
