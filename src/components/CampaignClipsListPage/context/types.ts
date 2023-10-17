import { CampaignPlayListFileType } from "services/campaignListService/types";

//  Типизация подготовлен6ного объекта ролика для листинга
export interface ClipListItemType {
  isActive: boolean;
  campaignId: string;
  playlistId: string;
  isProject: boolean;
  file: CampaignPlayListFileType;
  isLast: boolean;
  campaignName: string;
}

//  Типизация объекта ошибки запроса
export type RequestErrorResponse = {
  error: any;
};

//  Параметры шины загрузки роликов
export type DownloadClipPropsType = {
  fileName: string;
  title: string;
};