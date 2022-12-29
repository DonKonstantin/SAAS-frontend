import { Campaign, CampaignChannelInputObject, CampaignPlaylistConnect } from "services/campaignListService/types";
import { ProjectChannel } from "services/playerCodeService/interfaces";

export interface CampaignEditContextTypes {
  campaign: Campaign | undefined;
  isLoading: boolean
  campaignListErrorText: string | undefined
  isInitialized: boolean
  successCreatedPlaylist: boolean
  loadedChannels: ProjectChannel[];
  isChannelsLoading: boolean;
  error: string | undefined;
  selectedChannels: CampaignChannelInputObject[] | undefined;
};

export interface CampaignEditContextActionsTypes {
  /**
   * Запрашивает компанию по ID
   */
  loadCampaign: (campaignId: string) => void;

  /**
   * Записывает сущьность плейлиста в компанию
   * @param campaign
   */
  storeCampaignPlaylist: (playlist: CampaignPlaylistConnect) => void;

  /**
   * Удаляет плейлист с проекта
   * @param campaign
   */
  deleteCampaignPlaylist: (playlistId: string) => void;

  /**
   * Изменяет параметр перемешать для плейлиста
   * @param playlistId
   * @param shuffle
   */
  shuffleCampaignPlaylist: (playlistId: string, shuffle: boolean) => void;

  /**
   * Изменяет счетчик для плейлиста
   * @param playlistId
   * @param playCounter
   */
  playCounterCampaignPlaylist: (playlistId: string, playCounter: number) => void;

  /**
   * Изменяет сортировку плейлиста
   * @param playlistId
   * @param direction
   */
  movePlaylistCampaign: (playlistId: string, direction: "up" | "down") => void;

  /**
   * Изменяет сортировку плейлиста
   * @param fileIds
   */
  addFilesToUploadPlaylist: (fileIds: string[]) => void;

  /**
   * Устанавливает флаг для добавления плейлиста
   * @param addNewPlaylist
   */
  newAddedCampaignPlaylist: (addNewPlaylist: boolean) => void;

  /**
   * Записывает сущьность кампании в контекст
   * @param campaign 
   */
  setCampaign: (campaign: Campaign) => void;

  /**
   * Загружает доступные для кампании каналы
   */
  loadChannels: VoidFunction;

  /**
   * Очищает загруженные каналы
   */
  cleareLoadedChannels: VoidFunction;

  /**
   * Записываем выбранные каналы
   */
  setChannels: (channels: CampaignChannelInputObject[]) => void;
};


export type CampaignEditContextCommonType<T = {}> = T & CampaignEditContextTypes & CampaignEditContextActionsTypes;

