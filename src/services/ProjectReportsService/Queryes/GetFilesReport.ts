import { gql } from "@apollo/client";
import { GraphQLQuery } from "services/graphQLClient/GraphQLClient";

export class GetFilesReport implements GraphQLQuery<any> {
  readonly query: any;
  readonly variables: any;

  constructor() {
    this.variables = {
      
    };

    this.query = gql(``);
  }
}