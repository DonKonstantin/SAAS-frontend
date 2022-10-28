import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { ProjectChannel } from "services/playerCodeService/interfaces";
import {
  CampaignListServiceInterface,
  GetAvailableChannelsQueryQueryParams,
  GetAvailableChannelsQueryQueryResponse,
  GetCampaignByIdQueryParams,
  GetCampaignByIdQueryResponse,
  StoreCampdignMutationParams,
  StoreCampdignMutationResponse,
} from "./interface";
import { StoreCampdignMutation } from "./mutations/StoreCampdignMutation";
import { GetAvailableChannelsQuery } from "./Queries/GetAvailableChannelsQuery";
import { GetCampaignByIdQuery } from "./Queries/GetCampaignByIdQuery";
import { Campaign, CampaignInput } from "./types";

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
   * Получаем сущьность кампании по ее ID
   * @param campaignId 
   * @returns 
   */
  async getCampaignById(campaignId: string): Promise<Campaign> {
    this.logger.Debug("ID кампании: ", campaignId);

    try {
      const { campaign } = await this.client.Query<
        GetCampaignByIdQueryParams,
        GetCampaignByIdQueryResponse
      >(new GetCampaignByIdQuery(campaignId), {});

      return campaign[0];
    } catch (error) {
      this.logger.Debug("Ошибка получения списка каналов: ", error);

      throw Error(error);
    }
  };

  /**
   * Создает\сохраняет сущьность кампании
   * @param campaign 
   * @returns 
   */
  async storeCampaign(
    campaign: CampaignInput
  ): Promise<boolean> {
    this.logger.Debug("Сущьность кампании: ", campaign);

    try {
      const { storedCampaign } = await this.client.Query<
        StoreCampdignMutationParams,
        StoreCampdignMutationResponse
      >(new StoreCampdignMutation(campaign), {});

      return !!storedCampaign.id;
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
