import { Campaign, CampaignPlaylistConnect } from "services/campaignListService/types";

export interface CampaignEditContextTypes {
  campaign: Campaign | undefined;
  isLoading: boolean
  campaignListErrorText: string | undefined
  isInitialized: boolean
  successCreatedPlaylist: boolean
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
   * Изменяет сортировку плейлиста
   * @param nextSave
   */
  clearAddedCampaign: () => void;

  /**
   * Записывает сущьность кампании в контекст
   * @param campaign 
   */
  setCampaign: (campaign: Campaign) => void;
};


export type CampaignEditContextCommonType<T = {}> = T & CampaignEditContextTypes & CampaignEditContextActionsTypes;