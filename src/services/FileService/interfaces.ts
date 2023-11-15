import {
  MediaFile,
  ProjectMediaFile,
} from "services/MediaLibraryService/interface";
import { ProjectFileListAggregation } from "./types";

export interface FileServiceInterface {
  /**
   * Получаем список файлов по масиву ID
   * @param fileIds
   */
  getFilesListByFileIds(fileIds: string[]): Promise<MediaFile[]>;

  /**
   * Получаем список файлов по масиву ID
   * @param fileIds
   */
  getProjectFilesListByFileIds(fileIds: string[]): Promise<ProjectMediaFile[]>;

  /**
   * Get project files by project id
   * @param projectsId
   */
  getProjectFilesByProjectId(
    projectsId: string,
    limit: number,
    page: number,
    sort: any,
  ): Promise<ProjectMediaFile[]>;

  /**
   * Aggregate project files list by project id
   * @param projectsId
   */
  getProjectFilesByProjectIdAggregate(projectsId: string): Promise<ProjectFileListAggregation[]>;

  /**
   * Delete project files by file IDs
   * @param fileIds
   */
  deleteProjectFilesByFileIds(fileIds: string[]): Promise<number>;
}
