import { CampaignPlayListFileType } from "services/campaignListService/types";
import { ProjectPlayListFile } from "services/projectPlaylistService/interfaces";

//  Типизация подготовлен6ного объекта ролика для листинга
export interface ClipListItemType {
  isActive: boolean;
  campaignId: string;
  playlistId: string;
  isProject: boolean;
  file: CampaignPlayListFileType | ProjectPlayListFile;
  isLast: boolean;
}

//  Типизация объекта ошибки запроса
export type RequestErrorResponse = {
  error: any;
};

//  Параметры шины загрузки роликов
export type DownloadClipPropsType = {
  fileName: string;
  isProject: boolean;
  title: string;
};