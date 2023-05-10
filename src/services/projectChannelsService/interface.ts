import { ProjectChannel } from "services/playerCodeService/interfaces";

export interface ProjectChannelsServiceInterface {

  /**
   * Получения списка каналов по ID проекта
   */
   getChannels: (
    projectId: string,
  ) => Promise<ProjectChannel[]>;
}

export type GetChannelsByNameQueryParams = {
  projectId: string;
};

export type GetChannelsByNameQueryResponse = {
  channels: ProjectChannel[];
};