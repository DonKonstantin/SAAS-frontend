import { GraphQLQuery } from "../../graphQLClient/GraphQLClient";
import gql from "graphql-tag";
import { GetCampaignsByProjectIdParams } from "../interface";
import { FullProjectCampaign } from "services/fragments/fullCampaign";

/**
 * Запрос массива кампаний по их ID проекта
 */
export class GetCampaignsByProjectId
  implements GraphQLQuery<GetCampaignsByProjectIdParams>
{
  readonly query: any;
  readonly variables: GetCampaignsByProjectIdParams;

  constructor(projectId: string) {
    this.variables = {
      projectId,
    };

    this.query = gql(`
    query __GET_CAMPAIGNS_BY_PROJECT_ID__($projectId: ID){
      campaigns: campaign_list(where: { project_id: { _equals: $projectId } } )
      ${FullProjectCampaign}
    }`);
  }
}
