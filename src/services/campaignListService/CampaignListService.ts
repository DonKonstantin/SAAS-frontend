import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { ProjectChannel } from "services/playerCodeService/interfaces";
import {
  CampaignListServiceInterface,
  GetAvailableChannelsQueryQueryParams,
  GetAvailableChannelsQueryQueryResponse,
  GetChannelsForCampaignQueryParams,
  GetChannelsForCampaignQueryResponse,
} from "./interface";
import { GetAvailableChannelsQuery } from "./Queries/GetAvailableChannelsQuery";
import { GetChannelsForCampaignQuery } from "./Queries/GetChannelsForCampaignQuery";

/**
 * Сервис авторизации пользователя
 */
export class CampaignListService implements CampaignListServiceInterface {
  // Клиент GraphQL API
  private readonly client: GraphQLClient;

  //  Логгер
  private readonly logger: Logger;

  /**
   * Конструктор сервиса
   * @param client
   */
  constructor(client: GraphQLClient) {
    this.client = client;
    this.logger = loggerFactory().make(`Campaign list service`);
  }

  /**
   * Получаем каналы для листинга на странице редактирования кампании
   * @param projectId
   * @param campaignId
   * @returns
   */
  async getChannelsForCampaign(
    projectId: string,
    campaignId: string
  ): Promise<ProjectChannel[]> {
    this.logger.Debug("ID проекта: ", projectId);
    this.logger.Debug("Имя кампании: ", campaignId);

    try {
      const { channels } = await this.client.Query<
        GetChannelsForCampaignQueryParams,
        GetChannelsForCampaignQueryResponse
      >(new GetChannelsForCampaignQuery(projectId, campaignId), {});

      return channels.channels;
    } catch (error) {
      this.logger.Debug("Ошибка получения списка каналов: ", error);

      throw Error(error);
    }
  }

  /**
   * Получения списка каналов по ID проекта и части имени
   * @param projectId
   * @param name
   * @returns
   */
  async getAvailableChannels(
    projectId: string,
    name: string
  ): Promise<ProjectChannel[]> {
    this.logger.Debug("ID проекта: ", projectId);
    this.logger.Debug("Имя канала: ", name);

    try {
      const { channels } = await this.client.Query<
        GetAvailableChannelsQueryQueryParams,
        GetAvailableChannelsQueryQueryResponse
      >(new GetAvailableChannelsQuery(projectId, name), {});

      this.logger.Debug("Полученный спискок каналов: ", channels);

      return channels;
    } catch (error) {
      this.logger.Debug("Ошибка получения списка каналов: ", error);

      throw Error(error);
    }
  }
}
