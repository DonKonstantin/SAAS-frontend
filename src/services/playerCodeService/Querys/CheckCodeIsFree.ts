import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

export type CheckCodeIsFreeQueryParams = {
  code: string;
};

export type CheckCodeIsFreeQueryResponse = {
  codes_count: {
    count: number;
  };
};

/**
 * Запрос наличия кода плеера в системе
 */
export class CheckCodeIsFreeQuery
  implements GraphQLQuery<CheckCodeIsFreeQueryParams>
{
  readonly query: any;
  readonly variables: CheckCodeIsFreeQueryParams;

  constructor(code: string) {
    this.variables = {
      code,
    };

    this.query = gql(`
        query __CHECK_CODE__($code: String){
          codes_count: player_code_aggregate(where: {code: {_equals: $code}}){
            count
          }
        }`);
  }
}
