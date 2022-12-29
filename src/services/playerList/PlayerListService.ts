import { graphQLClient } from "services/graphQLClient";
import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { ObjectPassport, PlayerDetails, PlayerListServiceInterface } from "./interfaces";
import { SavePlayerMutation, SavePlayerMutationParams, SavePlayerMutationResponse } from "./Mutations/SavePlayerMutation";
import { GetCampaignsQuery, GetCampaignsQueryParams, GetCampaignsQueryResponse } from "./Queries/GetCampaignsQuery";
import { GetPlayerAvailablePasportsQuery, GetPlayerAvailablePasportsQueryParams, GetPlayerAvailablePasportsQueryResponse } from "./Queries/GetPlayerAvailablePasportsQuery";
import { GetPlayerObjectPasportQuery, GetPlayerObjectPasportQueryParams, GetPlayerObjectPasportQueryResponse } from "./Queries/GetPlayerPasportQuery";
import {PlayerWithoutRelations} from "../playerCodeService/interfaces";


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

        this.logger.Debug("Ответ на запрос кампаний для листинга плееров: ", players);

        return players;
      } catch (error) {
        this.logger.Error("Ошибка запроса кампаний для листинга плееров: ", error);

        throw error;
      }
    };

    /**
     * Запрос паспорта объекта привязанного к плееру
     * @param playerId 
     * @returns 
     */
    async loadPlayerObjectPassport(playerId: string): Promise<ObjectPassport> {
      this.logger.Debug("ID плеера: ", playerId);

      try {
        const { playerObjectPassport } = await this.client.Query<
          GetPlayerObjectPasportQueryParams, 
          GetPlayerObjectPasportQueryResponse
        >(
          new GetPlayerObjectPasportQuery(playerId),
          {}
        );

        this.logger.Debug("Ответ на запрос паспорта объекта привязанного к плееру: ", playerObjectPassport[0].object_passport);

        return playerObjectPassport[0].object_passport;
      } catch (error) {
        this.logger.Error("Ошибка запроса паспорта объекта привязанного к плееру: ", error);

        throw error;
      }
    };

    /**
     * Запрос паспортов объектов доступных плееру
     * @param projectId 
     * @returns 
     */
    async loadPlayerObjectPassports(projectId: string): Promise<ObjectPassport[]> {
      this.logger.Debug("ID проекта: ", projectId);

      try {
        const { playerAvailableObjectPassports } = await this.client.Query<
          GetPlayerAvailablePasportsQueryParams, 
          GetPlayerAvailablePasportsQueryResponse
        >(
          new GetPlayerAvailablePasportsQuery(projectId),
          {}
        );

        this.logger.Debug("Ответ на запрос доступных паспортов объектов для плеера: ", playerAvailableObjectPassports);

        return playerAvailableObjectPassports;
      } catch (error) {
        this.logger.Error("Ошибка запроса доступных паспортов объектов для плеера: ", error);

        throw error;
      }
    };

    /**
     * Мутация сохранения плеера
     * @param playerId 
     * @param objectPasportId 
     * @returns 
     */
    async savePlayer(playerId: string, objectPasportId: string): Promise<boolean> {
      this.logger.Debug("ID плеера: ", playerId);
      this.logger.Debug("ID паспорта объекта: ", objectPasportId);

      try {
        const { updatePlayer } = await this.client.Mutation<
          SavePlayerMutationParams, 
          SavePlayerMutationResponse
        >(
          new SavePlayerMutation(playerId, objectPasportId),
          {}
        );

        this.logger.Debug("Ответ на мутацию сохранения плеера: ", updatePlayer);

        return updatePlayer.id === playerId;
      } catch (error) {
        this.logger.Error("Ошибка мутации сохранения плеера: ", error);

        return false;
      }
    };

    /**
     * Получение списка плееров по ид проекта и ид коналов
     * @param projectId
     * @param channels
     */
    getPlayersByChannels(projectId: string, channels: string[]): Promise<PlayerWithoutRelations[]> {
        this.logger.Debug("ID проекта: ", projectId);
        this.logger.Debug("ID каналов: ", channels);

        try {



        } catch (e) {
            throw  e;
        }

        return Promise.resolve([]);
    }
};