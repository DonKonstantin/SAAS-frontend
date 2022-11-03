import { Campaign, CampaignPlaylistConnectInput } from "services/campaignListService/types";

export interface CampaignEditContextTypes {
  campaign: Campaign | undefined;
  isLoading: boolean
  campaignListErrorText: string | undefined
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
  storeCampaignPlaylist: (playlist: CampaignPlaylistConnectInput) => void;

  /**
   * Удаляет плейлист с проекта
   * @param campaign
   */
  deleteCampaignPlaylist: (playlistId: string) => void;

  /**
   * Записывает сущьность кампании в контекст
   * @param campaign 
   */
  setCampaign: (campaign: Campaign) => void;
};


export type CampaignEditContextCommonType<T = {}> = T & CampaignEditContextTypes & CampaignEditContextActionsTypes;