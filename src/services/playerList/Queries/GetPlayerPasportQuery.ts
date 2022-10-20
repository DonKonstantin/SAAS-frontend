import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { ObjectPassport } from "../interfaces";

export interface GetPlayerObjectPasportQueryParams {
  playerId: string;
}

export interface GetPlayerObjectPasportQueryResponse {
  playerObjectPassport: {
    object_passport: ObjectPassport;
  };
}

/**
 * Запрос паспорта объекта привязанного к плееру
 */
export class GetPlayerObjectPasportQuery
  implements GraphQLQuery<GetPlayerObjectPasportQueryParams>
{
  readonly query: any;
  readonly variables: GetPlayerObjectPasportQueryParams;

  constructor(playerId: string) {
    this.variables = {
      playerId,
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
