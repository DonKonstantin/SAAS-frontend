import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import {gql} from "@apollo/client";

/**
 * Query load all available notification templates
 * Warning Limit = 1000
 */
export default class LoadAllTemplatesQuery implements GraphQLQuery<null> {
    readonly query: any;
    readonly variables: null;

    constructor() {
        this.query = gql(`
        query Templates{
            templates: notifications_template_list(
                limit: 1000
            ) {
                id
                body
                recipient
                name
                title
            }
        }
        `)
    }
}
