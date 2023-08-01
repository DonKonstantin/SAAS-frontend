import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";

export type CheckCountChannelsByProjectIDQueryParams = {
  projectId: string;
  isActive?: boolean;
};

export type CheckCountChannelsByProjectIDQueryResponse = {
  channels: { count: number }[]
};

/**
 * Запрос каналов по ID проекта
 */
export class CheckCountChannelsByProjectIDQuery
  implements GraphQLQuery<CheckCountChannelsByProjectIDQueryParams> {
  readonly query: any;
  readonly variables: CheckCountChannelsByProjectIDQueryParams;

  constructor(projectId: string, isActive?: boolean) {
    this.variables = {
      projectId,
      isActive,
    };

    const queryActiveAttr = isActive === undefined ? '' : ', $isActive: Boolean';
    const queryActiveParams = isActive === undefined ? '' : 'is_active: {_equals: $isActive}';

    this.query = gql(`
      query __CHECK_COUNT_CHANNELS__($projectId: ID${queryActiveAttr}){
        channels: project_channel_aggregate(where: {project_id: {_equals: $projectId} ${queryActiveParams}}){
          count
        }
      }`);
  }
}
