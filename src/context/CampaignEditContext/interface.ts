import { Campaign } from "services/campaignListService/types";

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
};


export type CampaignEditContextCommonType<T = {}> = T & CampaignEditContextTypes & CampaignEditContextActionsTypes;