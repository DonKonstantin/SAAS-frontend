import mediaLibraryService from "services/MediaLibraryService";
import { MediaFilesDoubles } from "services/MediaLibraryService/interface";

export const checksFileExists = (fileList: {[x: string]: string[]}): Promise<MediaFilesDoubles[]> => {
  const fileNames = Object.values(fileList).flatMap(item => item);

  if (!fileNames.length) {
    return Promise.resolve([]);
  }

  return mediaLibraryService().findDoubles(fileNames);
};