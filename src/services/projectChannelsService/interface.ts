import { ProjectChannel } from "services/playerCodeService/interfaces";

export interface ProjectChannelsServiceInterface {

    /**
     * Получаем кол-во каналов для проекта канала
     */
    checkCountChannels: (projectId: string, isActive?: boolean) => Promise<number>;

    /**
   * Получения списка каналов по ID проекта
   */
   getChannels: (
    projectId: string,
    isActive?: boolean,
  ) => Promise<ProjectChannel[]>;
}

export type GetChannelsByNameQueryParams = {
  projectId: string;
  limit: number;
  isActive?: boolean;
};

export type GetChannelsByNameQueryResponse = {
  channels: ProjectChannel[];
};