import {
  CampaignChannels,
  ProjectChannel,
} from "services/playerCodeService/interfaces";
import { Campaign, CampaignInput, CampaignPlayListFileType } from "./types";

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
  storeCampaign: (campaign: CampaignInput) => Promise<Campaign>;

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

  /**
   * Получаем сущьности кампаний проекта по его ID
   * @param projectId
   * @returns
   */
  getCampaignsByProjectId: (projectId: string) => Promise<Campaign[]>;

  /**
   * Getting campaign playlists files by campaign project ID
   * @param projectId
   * @returns
   */
  getCampaignsPlaylistsByProjectId: (projectId: string) => Promise<CampaignFileWithCampaignName[]>;
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
  campaignStore: Campaign;
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
};

export interface GetCampaignsArrayByIdsResponse {
  campaigns: Campaign[];
};

//  Типизация параметров запроса кампаний по ID проекта
export type GetCampaignsByProjectIdParams = {
  projectId: string;
};
export type GetCampaignsByProjectIdResponse = {
  campaigns: Campaign[];
};

export type GetCampaignsPlaylistsByProjectIdParams = {
  projectId: string;
};
export type GetCampaignsPlaylistsByProjectIdResponse = {
  campaigns: {
    name: string;
    playlists: {
      campaignPlaylist?: {
        files: CampaignPlayListFileType[];
      };
    }[];
  }[];
};
export type CampaignFileWithCampaignName = {
  campaignName: string;
  files: CampaignPlayListFileType[];
};