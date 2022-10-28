import { Campaign } from "services/campaignListService/types";

export interface CampaignEditContextTypes {
  campaign: Campaign | undefined;
};

export interface CampaignEditContextActionsTypes {
  /**
   * Записываем кампанию в контекст
   */
  setCampaign: (campaig: Campaign) => void;
};


export type CampaignEditContextCommonType<T = {}> = T & CampaignEditContextTypes & CampaignEditContextActionsTypes;