import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

export type GetPlayersByChanelIDsQueryParams = {
    projectId: string
    channels: string[]
}

export type GetPlayersByChanelIDsQueryResponse = {

}

export class GetPlayersByChanelIDs
    implements GraphQLQuery<GetPlayersByChanelIDsQueryParams>
{
    readonly query: any;
    readonly variables: GetPlayersByChanelIDsQueryParams;

    constructor(projectId: string,   channels: string[]) {
        this.variables = {
            projectId,
            channels,
        };

        this.query = gql(`
    query __PLAYER_PASPORT_OBJECT__($playerId: ID) {
      playerObjectPassport: player_list(
        where: { _and: [{ id: { _equals: $playerId} }] }
      ) {
        object_passport {
          user_name
          site_name
          locality
          id
          accountant
          director
          project_id
          rao_authors_fee_for_december
          rao_authors_fee_for_on_to_eleven_months
          rao_date_of_conclusion
          rao_email
          rao_license_number
          rao_requisites
          user_inn
          vois_date_of_conclusion
          vois_email
          vois_fee
          vois_license_number
        }
      }
    }`);
    }
};