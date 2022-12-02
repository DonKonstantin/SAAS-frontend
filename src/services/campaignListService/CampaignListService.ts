import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import {
  CampaignChannels,
  ProjectChannel,
} from "services/playerCodeService/interfaces";
import {
  CampaignListServiceInterface,
  CampaignPublishQueryParams,
  CampaignPublishQueryResponse,
  GetAvailableChannelsQueryQueryParams,
  GetAvailableChannelsQueryQueryResponse,
  GetCampaignByArrayIdQueryParams,
  GetCampaignByArrayIdResponse,
  GetCampaignByIdQueryParams,
  GetCampaignByIdQueryResponse,
  GetCampaignsArrayByIdsQueryParams,
  GetCampaignsArrayByIdsResponse,
  StoreCampaignMutationParams,
  StoreCampaignMutationResponse,
} from "./interface";
import { GetAvailableChannelsQuery } from "./Queries/GetAvailableChannelsQuery";
import { GetCampaignByIdQuery } from "./Queries/GetCampaignByIdQuery";
import { Campaign, CampaignInput } from "./types";
import { StoreCampaignMutation } from "./mutations/StoreCampaignMutation";
import { CampaignPublish } from "./mutations/CampaignPublish";
import { GetCampaignsByArrayId } from "./Queries/GetCampaignsByArrayId";
import { GetCampaignsArrayByIdsQuery } from "./Queries/GetCampaignsArrayByIds";
import { GetCampaignTimetableValidation } from "./Queries/GetCampaignTimetableValidation";

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
   * Получаем сущность кампании по ее ID
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
  }

  /**
   * Получаем каналы компании по массиву ID
   * @param campaignArrayId
   * @returns
   */
  async getCampaignByArrayId(
    campaignArrayId: string[]
  ): Promise<CampaignChannels[]> {
    this.logger.Debug("Массив ID кампании: ", campaignArrayId);

    try {
      const { campaignChannels } = await this.client.Query<
        GetCampaignByArrayIdQueryParams,
        GetCampaignByArrayIdResponse
      >(new GetCampaignsByArrayId(campaignArrayId), {});
      return campaignChannels;
    } catch (error) {
      this.logger.Debug(
        "Ошибка получения списка каналов компаний по массиву ID : ",
        error
      );

      throw Error(error);
    }
  }

  /**
   * Получение сущностей кампаний по ID
   * @param campaignArrayId
   * @returns
   */
  async getCampaignsArrayByIds(campaignArrayId: string[]): Promise<Campaign[]> {
    this.logger.Debug("Массив ID кампаний: ", campaignArrayId);

    try {
      const { campaigns } = await this.client.Query<
        GetCampaignsArrayByIdsQueryParams,
        GetCampaignsArrayByIdsResponse
      >(new GetCampaignsArrayByIdsQuery(campaignArrayId), {});
      return campaigns;
    } catch (error) {
      this.logger.Debug(
        "Ошибка получения списка компаний по массиву ID : ",
        error
      );

      throw Error(error);
    }
  }


  /**
   * Проверка валидации расписания компании
   * @param campaign
   * @returns
   */
  async campaignValidation(
    campaign: CampaignInput
  ): Promise<boolean> {
    this.logger.Debug("Сущность кампании: ", campaign);

    try {
      const response = await this.client.Query<StoreCampaignMutationParams, any>(new GetCampaignTimetableValidation(campaign), {});
      return response.campaignTimetableValidation
    } catch (error) {
      this.logger.Debug("Ошибка в проверке кампании: ", error);
      throw error;
    }
  }

  /**
   * Создает\сохраняет сущьность кампании
   * @param campaign
   * @returns
   */
  async storeCampaign(campaign: CampaignInput): Promise<string> {
    this.logger.Debug("Сущность кампании: ", campaign);

    try {
      const { campaignStore } = await this.client.Query<
        StoreCampaignMutationParams,
        StoreCampaignMutationResponse
      >(new StoreCampaignMutation(campaign), {});
      return campaignStore.id;
    } catch (error) {
      this.logger.Debug("Ошибка в создании кампании: ", error);
      throw error;
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

  /**
   * Публикует кампанию
   * @param campaignPublishInput
   * @returns
   */
  async publishCampaign(
    campaignPublishInput: CampaignPublishQueryParams
  ): Promise<boolean> {
    this.logger.Debug("Параметры публикации кампании: ", campaignPublishInput);

    const { campaignId, channelIds } = campaignPublishInput;

    try {
      const { campaignPublish } = await this.client.Mutation<
        CampaignPublishQueryParams,
        CampaignPublishQueryResponse
      >(new CampaignPublish(campaignId, channelIds), {});

      this.logger.Debug("Кампания успешно опубликована: ", campaignPublish);

      return campaignPublish;
    } catch (error) {
      this.logger.Debug("Ошибка при публикации кампании: ", error);

      throw Error(error);
    }
  }
}
