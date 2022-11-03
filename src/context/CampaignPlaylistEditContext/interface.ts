import { CampaignPlaylistConnect, CampaignPlayListFileType } from "services/campaignListService/types";

export interface CampaignPlaylistEditContextTypes {
  playlist: CampaignPlaylistConnect | undefined;
  availableTabs: Tabs[];
  isEdit: boolean;
  projectId: string;
  loadedClips: CampaignPlayListFileType[];
  uploadedClips: string[];
  isLoading: boolean;
};

export interface CampaignPlaylistEditContextActionsTypes {
  /**
   * Записываем плэйлист в контекст
   */
  setPlaylist: (playlist: CampaignPlaylistConnect | undefined) => void;

  /**
   * Очистка контекста
   */
  clearContext: VoidFunction;

  /**
   * Записывает чистый объект плэйлиста в контекст
   */
  setNewPlaylist: (sortOrder: number) => void;

  /**
   * Записывает флаг доступности дополнительных табов табов
   */
  setAvailableTabs: (tabs: Tabs[]) => void;

  /**
   * Устанавливает флаг редактирования true
   */
   setIsEditable: VoidFunction;

   /**
    * Двигает трэк в вверх по очереди
    */
   moveTrackUp: (fileId: string) => void;

   /**
    * Двигает трэк в вниз по очереди
    */
   moveTrackDown: (fileId: string) => void;

   /**
    * Удаляет трэк из списка
    */
   removeTrack: (fileId: string) => void;

   /**
    * Записывает значение projectId
    */
   setProjectId: (projectId: string) => void;

   /**
    * Удаляет загруженный ролик из списка доступных для добавления к плэйлисту
    */
   removeLoadedFile: (fileIds: string[]) => void;

   /**
    * Добавляем загруженные файлы к плэйлисту
    */
   addLoadedToPlaylist: (fileIds: string[]) => void;

   /**
    * Добавляем список загруженных файлов
    */
   addFilesToUpload: (fileIds: string[]) => void;

   /**
    * Записывает флаг загрузки
    */
   setIsLoading: (isLoading: boolean) => void;
};


export type CampaignPlaylistEditContextCommonType<T = {}> = T & CampaignPlaylistEditContextTypes & CampaignPlaylistEditContextActionsTypes;

export enum Tabs {
  "tracks" = "tracks",
  "schedule" = "schedule",
  "clips" = "clips",
}