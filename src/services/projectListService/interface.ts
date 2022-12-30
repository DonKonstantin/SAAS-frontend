import { ProjectData } from "services/loaders/domainsAndProjects/LoaderQuery";

export interface ProjectListServiceInterface {
  /**
   * Получаем список проектов по массиву ID
   * @param projectIds 
   * @returns 
   */
  getProjectsByIds: (projectIds: string[]) => Promise<ProjectData[]>;
};