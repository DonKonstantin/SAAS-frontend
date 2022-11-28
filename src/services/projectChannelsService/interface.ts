import { ProjectChannel } from "services/playerCodeService/interfaces";

export interface ProjectChannelsServiceInterface {

  /**
   * Получения списка каналов по ID проекта и части имени
   */
   getChannelsByName: (
    projectId: string,
    name: string
  ) => Promise<ProjectChannel[]>;
}

export type GetChannelsByNameQueryParams = {
  projectId: string;
  name: string;
};

export type GetChannelsByNameQueryResponse = {
  channels: ProjectChannel[];
};