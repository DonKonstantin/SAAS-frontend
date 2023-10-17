import { ProjectMediaFile } from "services/MediaLibraryService/interface";
import { ProjectData } from "services/loaders/domainsAndProjects/LoaderQuery";

export interface ProjectListServiceInterface {
  /**
   * Получаем список проектов по массиву ID
   * @param projectIds
   * @returns
   */
  getProjectsByIds: (projectIds: string[]) => Promise<ProjectData[]>;

  /**
   * Получаем список кампаний проекта с плэйлистами собственных файлов
   * @param projectId
   * @param currentCampaignId
   * @returns
   */
  getCampaignsFiles: (projectId: string, currentCampaignId: string | undefined) => Promise<ProjectMediaFile[]>;
}
