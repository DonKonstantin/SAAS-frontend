import { MediaFile, ProjectMediaFile } from "services/MediaLibraryService/interface";

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

export interface GetProjectFilesListByProjectIdQueryParams {
  projectId: string;
}
export interface GetProjectFilesListByProjectIdQueryResponse {
  result: ProjectMediaFile[];
}

export interface DeleteProjectFileByFileIdsParams {
  ids: string[];
}
export interface DeleteProjectFileByFileIdsResponse {
  project_file_delete: {
    affected_rows: number;
  };
}