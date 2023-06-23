import { gql } from "@apollo/client";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";
import { DeleteItemsByIdProps } from "../types";
import { Schemas } from "settings/schema";

/**
 * Мутация удаления сущности
 */
export class DeleteItemsByIdMutation
  implements GraphQLQuery<DeleteItemsByIdProps>
{
  readonly query: any;
  readonly variables: DeleteItemsByIdProps;

  constructor(deleteSchema: keyof Schemas, code: string | number, ids: string[]) {
    this.variables = {
      deleteSchema,
      code,
      ids,
    };

    this.query = gql`
      mutation __DELETE_ENTITY__($ids: [String]) {
        ${deleteSchema}_delete(where: {${code}: {_in: $ids}}) {
          affected_rows
        }
      }
    `;
  };
};