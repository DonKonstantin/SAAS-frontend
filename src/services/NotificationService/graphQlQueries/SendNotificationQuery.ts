import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {NotificationChannel, SendNotificationQueryVariables} from "../interface";

/**
 * Запрос на отправку сообщения
 */
export class SendNotificationQuery implements GraphQLQuery<SendNotificationQueryVariables> {
    readonly query: any;
    readonly variables: SendNotificationQueryVariables;

    constructor(templateId: number, templateVariables: Object, channel: NotificationChannel) {
        this.variables = {
            templateId,
            data: JSON.stringify(templateVariables),
        };

        this.query = gql`
        query __SEND_TEMPLATE__(
            $templateId: Int!,
            $data: String!,
        )   {
                result: send_notification(template_id: $templateId, data: $data, channel: ${channel} ) {
                    success
            }
        }`
    }
}
