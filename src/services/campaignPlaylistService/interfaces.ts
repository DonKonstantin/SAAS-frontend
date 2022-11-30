import { CampaignPlayList } from "services/campaignListService/types";

export interface CampaignPlaylistServiceInterface {
  /**
   * Cозданиt/сохранениt плейлиста кампании
   */
  storeCampaignPlaylist: (campaignPlaylist: CampaignPlayListInput) => Promise<CampaignPlayList>;
};

//  Сущность плейлиста кампании
export interface CampaignPlayListInput {
  campaignId: number;                             // Идентификатор кампании, к которой относится плейлист
  name: string;                                   // Название плейлиста
  isOverallVolume: boolean;                       // Флаг, что в плейлисте используется единая громкость мелодий
  overallVolume: number;                          //  Общая громкость звука в плейлисте
  files: CampaignPlayListFileInput[];             //  Файлы, относящиеся к плейлисту
  id?: number;                                    //  ID сущности
  projectId: number;                              //  Идентификатор проекта, к которому относится плейлист
};

//  Сущность файла из плейлиста кампании
export interface CampaignPlayListFileInput {
  sort: number;                                   //  Порядок сортировки
  id?: number;                                    //  ID сущности
  volume: number;                                 //  Громкость звука файла в плейлисте
  fileId: number;                                 //  Идентификатор файла из библиотеки проекта
};

export interface StoreCampaignPlaylistMutationParams {
  campaignPlaylist: CampaignPlayListInput;
}

export interface StoreCampaignPlaylistMutationResponse {
  result: CampaignPlayList;
}