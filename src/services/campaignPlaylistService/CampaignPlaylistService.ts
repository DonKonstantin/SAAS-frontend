import { CampaignPlayList } from "services/campaignListService/types";
import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import {
  CampaignPlayListInput,
  CampaignPlaylistServiceInterface,
  StoreCampaignPlaylistMutationParams,
  StoreCampaignPlaylistMutationResponse
} from "./interfaces";
import { StorePlaylistMutation } from "./Mutations/storePlaylist";

/**
 * Сервис для работы с плэйлистами кампании
 */
export default class CampaignPlaylistService
  implements CampaignPlaylistServiceInterface
{
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
    this.logger = loggerFactory().make(`PlaylistService`);
  }

  /**
   * Cозданиt/сохранениt плейлиста кампании
   * @param campaignPlaylist 
   * @returns 
   */
  async storeCampaignPlaylist(campaignPlaylist: CampaignPlayListInput): Promise<CampaignPlayList> {
    this.logger.Debug("Плэйлист кампании для сохранения: ", campaignPlaylist);

    try {
      const response = await this.client.Mutation<
        StoreCampaignPlaylistMutationParams,
        StoreCampaignPlaylistMutationResponse
          >(new StorePlaylistMutation(campaignPlaylist), {});

      this.logger.Debug("Ответ на мутацию сохранения плэйлиста кампании: ", response);

      return response.result;
    } catch (error) {
      this.logger.Error("Ошибка мутации сохранения плэйлиста кампании: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  };
}
