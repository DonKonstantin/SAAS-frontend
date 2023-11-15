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
  limit: number;
  offset: number;
  order: any;
}
export interface GetProjectFilesListByProjectIdQueryResponse {
  result: ProjectMediaFile[];
}

export interface ProjectFilesListByProjectIdAggregateQueryParams {
  projectId: string;
}
export interface ProjectFilesListByProjectIdAggregateQueryResponse {
  result: {
    count: number;
  }[];
}

//  Response type for get project files list method
export type ProjectFileListAggregation = {
  count:  number;
};

export interface DeleteProjectFileByFileIdsParams {
  ids: string[];
}
export interface DeleteProjectFileByFileIdsResponse {
  project_file_delete: {
    affected_rows: number;
  };
}