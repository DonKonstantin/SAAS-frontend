import {
  CampaignChannels,
  ProjectChannel,
} from "services/playerCodeService/interfaces";
import { Campaign, CampaignInput } from "./types";

export interface CampaignListServiceInterface {
  /**
   * Получаем сущность кампании по ее ID
   */
  getCampaignById: (campaignId: string) => Promise<Campaign>;

  /**
   * Получение сущностей кампаний по ID
   */
  getCampaignsArrayByIds: (campaignArrayId: string[]) => Promise<Campaign[]>;

  /**
   * Получаем каналы компании по массиву ID
   */
  getCampaignByArrayId: (
    campaignArrayId: string[]
  ) => Promise<CampaignChannels[]>;

  /**
   * Проверка валидации расписания компании
   */
  campaignValidation: (
    campaign: CampaignInput
  ) => Promise<boolean>;

  /**
   * Создает\сохраняет сущьность кампании
   */
  storeCampaign: (campaign: CampaignInput) => Promise<string>;

  /**
   * Получения списка каналов по ID проекта и части имени
   */
  getAvailableChannels: (
    projectId: string,
    name: string
  ) => Promise<ProjectChannel[]>;

  /**
   * Публикация компании
   */
  publishCampaign: (
    campaignPublishInput: CampaignPublishQueryParams
  ) => Promise<boolean>;
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

export type StoreCampaignMutationParams = {
  campaign: CampaignInput;
};

export type StoreCampaignMutationResponse = {
  campaignStore: {
    id: string;
  };
};

export type CampaignPublishQueryParams = {
  campaignId: number;
  channelIds: number[];
};

export type CampaignPublishQueryResponse = {
  campaignPublish: boolean;
};

export type GetCampaignByArrayIdQueryParams = {
  campaignArrayId: string[];
};

export type GetCampaignByArrayIdResponse = {
  campaignChannels: CampaignChannels[];
};

export interface GetCampaignsArrayByIdsQueryParams {
  campaignArrayId: string[];
}

export interface GetCampaignsArrayByIdsResponse {
  campaigns: Campaign[];
}
