import { ProjectChannel } from "services/playerCodeService/interfaces";
import { Campaign, CampaignInput } from "./types";

export interface CampaignListServiceInterface {
  /**
   * Получаем сущьность кампании по ее ID
   */
  getCampaignById: (
    campaignId: string
  ) => Promise<Campaign>;

  /**
   * Создает\сохраняет сущьность кампании
   */
  storeCampaign: (
    campaign: CampaignInput
  ) => Promise<boolean>;

  /**
   * Получения списка каналов по ID проекта и части имени
   */
  getAvailableChannels: (
    projectId: string,
    name: string
  ) => Promise<ProjectChannel[]>;
}

export type GetAvailableChannelsQueryQueryParams = {
  projectId: string;
  name: string;
};

export type GetAvailableChannelsQueryQueryResponse = {
  channels: ProjectChannel[];
};

export type GetChannelsForCampaignQueryParams = {
  projectId: string;
  campaignId: string;
};

export type GetChannelsForCampaignQueryResponse = {
  channels: {
    channels: ProjectChannel[];
  };
};

export type GetCampaignByIdQueryParams = {
  campaignId: string;
};

export type GetCampaignByIdQueryResponse = {
  campaign: Campaign[];
};

export type StoreCampdignMutationParams = {
  campaign: CampaignInput;
};

export type StoreCampdignMutationResponse = {
  storedCampaign: {
    id: string;
  };
};