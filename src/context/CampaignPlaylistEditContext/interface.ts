import { CampaignPlaylistConnect } from "services/campaignListService/types";

export interface CampaignPlaylistEditContextTypes {
  playlist: CampaignPlaylistConnect | undefined;
  availableTabs: Tabs[];
  isEdit: boolean;
  projectId: string;
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
  setNewPlaylist: (projectId: string) => void;

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
};


export type CampaignPlaylistEditContextCommonType<T = {}> = T & CampaignPlaylistEditContextTypes & CampaignPlaylistEditContextActionsTypes;

export enum Tabs {
  "tracks" = "tracks",
  "schedule" = "schedule",
  "clips" = "clips",
}