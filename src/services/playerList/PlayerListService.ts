import { graphQLClient } from "services/graphQLClient";
import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { PlayerDetails, PlayerListServiceInterface } from "./interfaces";
import { GetCampaignsQuery, GetCampaignsQueryParams, GetCampaignsQueryResponse } from "./Queries/GetCampaignsQuery";


/**
 * Сервис листинга плееров
 */
export class PlayerListService implements PlayerListServiceInterface {
    private readonly logger: Logger = loggerFactory().make(`PlayerListService`);
    private readonly client: GraphQLClient = graphQLClient();

    /**
     * Запрос о компаниях для листинга плееров
     * @param playerIds 
     * @param projectId 
     * @returns 
     */
    async getCampaigns(playerIds: string[], projectId: string): Promise<PlayerDetails[]> {
      this.logger.Debug("Массив ID плееров: ", playerIds);
      this.logger.Debug("ID проекта: ", projectId);

      try {
        const { players } = await this.client.Query<GetCampaignsQueryParams, GetCampaignsQueryResponse>(
          new GetCampaignsQuery(playerIds, projectId),
          {}
        );

        this.logger.Debug("Ответ на запрос компаний для листинга плееров: ", players);

        return players;
      } catch (error) {
        this.logger.Error("Ошибка запроса компаний для листинга плееров: ", error);

        throw error;
      }
    };
};