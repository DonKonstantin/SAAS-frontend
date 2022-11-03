import { MediaFile } from "services/MediaLibraryService/interface";

export interface FileServiceInterface {
    /**
     * Получаем список файлов по масиву ID
     * @param fileIds 
     */
    getFilesListByFileIds(fileIds: string[]): Promise<MediaFile[]>
}

export interface GetFilesListByFileIdsQueryParams {
  fileIds: string[];
};

export interface GetFilesListByFileIdsQueryResponse {
  files: MediaFile[];
};