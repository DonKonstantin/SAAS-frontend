import {
  MediaFile,
  ProjectMediaFile,
} from "services/MediaLibraryService/interface";

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
}

export interface GetFilesListByFileIdsQueryParams {
  fileIds: string[];
}

export interface GetFilesListByFileIdsQueryResponse {
  files: MediaFile[];
}

export interface GetProjectFilesListByFileIdsQueryParams {
  fileIds: string[];
}

export interface GetProjectFilesListByFileIdsQueryResponse {
  result: ProjectMediaFile[];
}
