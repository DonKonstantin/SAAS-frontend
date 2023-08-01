import {GraphQLQuery} from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import {ProjectChannel} from "../interfaces";

export type GetChannelsByProjectIDQueryParams = {
  projectId: string;
  limit: number;
  isActive: boolean;
};

export type GetChannelsByProjectIDQueryResponse = {
  channels: ProjectChannel[];
};

// Todo дубль запроса src/services/playerCodeService/Queries/GetChannelsByProjectID.ts

/**
 * Запрос каналов по ID проекта
 */
export class GetChannelsByProjectIDQuery
  implements GraphQLQuery<GetChannelsByProjectIDQueryParams> {
  readonly query: any;
  readonly variables: GetChannelsByProjectIDQueryParams;

  constructor(projectId: string, limit: number, isActive: boolean) {
    this.variables = {
      projectId,
      limit,
      isActive,
    };

    const queryActiveAttr = isActive === undefined ? '' : ', $isActive: Boolean';
    const queryActiveParams = isActive === undefined ? '' : 'is_active: {_equals: $isActive}';

    this.query = gql(`
      query __GET_CHANNELS__($projectId: ID, $limit: Int${queryActiveAttr}){
        channels: project_channel_list(where: {project_id: {_equals: $projectId} ${queryActiveParams}} limit: $limit){
          id
          is_active
          name
          project_id
        }
      }`);
  }
}
