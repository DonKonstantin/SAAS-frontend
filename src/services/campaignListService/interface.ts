import { ProjectChannel } from "services/playerCodeService/interfaces";

export interface CampaignListServiceInterface {
  /**
   * Получаем каналы для листинга на странице редактирования кампании
   */
  getChannelsForCampaign: (
    projectId: string,
    campaignId: string
  ) => Promise<ProjectChannel[]>;

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
