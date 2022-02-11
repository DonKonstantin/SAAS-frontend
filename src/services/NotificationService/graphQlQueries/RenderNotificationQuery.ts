import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {RenderNotificationQueryVariables} from "../interface";

/**
 * Запрос на пререндер сообщения
 */
export class RenderNotificationQuery implements GraphQLQuery<RenderNotificationQueryVariables> {
    readonly query: any;
    readonly variables: RenderNotificationQueryVariables;

    constructor(template: string, templateVariables: Object) {
        this.variables = {
            template,
            data: JSON.stringify(templateVariables)
        }
        this.query = gql`
        query __RENDER_TEMPLATE__(
            $template: String!,
            $data: String!
        )   {
                template: render_template(template: $template, data: $data ) {
                    template
            }
        }`
    }
}
