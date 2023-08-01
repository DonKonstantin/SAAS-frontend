import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetChannelsByNameQueryParams } from "../interface";

/**
 * Запрос каналов по ID проекта
 */
export class GetChannelsByNameQuery
  implements GraphQLQuery<GetChannelsByNameQueryParams>
{
  readonly query: any;
  readonly variables: GetChannelsByNameQueryParams;


  constructor(projectId: string, limit: number, isActive?: boolean) {
    this.variables = {
      projectId,
      limit,
      isActive,
    };

    const queryActiveAttr = isActive === undefined ? '' : ', $isActive: Boolean';
    const queryActiveParams = isActive === undefined ? '' : 'is_active: {_equals: $isActive}';

    // ToDo запрос по идентификатору, а не по имени, дубль с другим запросом

    this.query = gql(`
      query __GET_CHANNELS__($projectId: ID, $limit: Int${queryActiveAttr}){
        channels: project_channel_list(where: {project_id: {_equals: $projectId} ${queryActiveParams}} limit: $limit){
          id
          is_active
          name
          players{
            id
            is_active
          }
        }
      }`);
  }
}
