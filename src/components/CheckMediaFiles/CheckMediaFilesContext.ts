import {MediaFilesDoubles} from "../../services/MediaLibraryService/interface";

type CheckMediaFilesContext = {
    fileCheckResult: MediaFilesDoubles[],
    filePathsOrNames: string[],
    fileNames: string[],
}

type CheckMediaFilesContextActions = {
    addFileRawData(filePathOrName: string): void;
    removeFileRawData(filePathOrName: string): void;
    runCheck(): void;
}
