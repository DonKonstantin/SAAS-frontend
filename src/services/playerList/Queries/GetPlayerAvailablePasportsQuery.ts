import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { ObjectPassport } from "../interfaces";

export interface GetPlayerAvailablePasportsQueryParams {
  projectId: string;
}

export interface GetPlayerAvailablePasportsQueryResponse {
  playerAvailableObjectPassports: ObjectPassport[];
}

/**
 * Запрос паспорта объекта привязанного к плееру
 */
export class GetPlayerAvailablePasportsQuery
  implements GraphQLQuery<GetPlayerAvailablePasportsQueryParams>
{
  readonly query: any;
  readonly variables: GetPlayerAvailablePasportsQueryParams;

  constructor(projectId: string) {
    this.variables = {
      projectId,
    };

    this.query = gql(`
    query __PLAYER_PASPORT_OBJECT__($projectId: ID) {
      playerAvailableObjectPassports: object_passport_list(
        where: { _and: [{ project_id: { _equals: $projectId} }] }
      ) {
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
    }`);
  }
};
