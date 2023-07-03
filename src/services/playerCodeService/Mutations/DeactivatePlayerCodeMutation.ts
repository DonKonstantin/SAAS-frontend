import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

export type DeactivatePlayerCodeMutationParams = {
  code: string[];
};

export type DeactivatePlayerCodeMutationResponse = {
  player_code_update: {
    affected_rows: number;
  }
};

/**
 * Запрос наличия кода плеера в системе
 */
export class DeactivatePlayerCodeMutation
  implements GraphQLQuery<DeactivatePlayerCodeMutationParams>
{
  readonly query: any;
  readonly variables: DeactivatePlayerCodeMutationParams;

  constructor(code: string[]) {
    this.variables = {
      code,
    };

    this.query = gql(`
    mutation __DEACTIVATE_CODE__($code: [String]){
      player_code_update( where: { code: { _in: $code } }, set: { is_active: false } ){
        affected_rows
      }
    }`);
  }
}
