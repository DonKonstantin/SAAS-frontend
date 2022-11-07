import { Campaign, CampaignPlaylistConnect } from "services/campaignListService/types";

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
   * Записывает сущьность кампании в контекст
   * @param campaign 
   */
  setCampaign: (campaign: Campaign) => void;

  /**
   * Записывает сущьность плейлиста в компанию
   * @param campaign
   */
  storeCampaignPlaylist: (playlist: CampaignPlaylistConnect) => void;
};


export type CampaignEditContextCommonType<T = {}> = T & CampaignEditContextTypes & CampaignEditContextActionsTypes;