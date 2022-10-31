import { CampaignPlaylistConnect } from "services/campaignListService/types";

export interface CampaignPlaylistEditContextTypes {
  playlist: CampaignPlaylistConnect | undefined;
  isTabsAvailable: boolean;
  isEdit: boolean;
};

export interface CampaignPlaylistEditContextActionsTypes {
  /**
   * Записываем плэйлист в контекст
   */
  setPlaylist: (playlist: CampaignPlaylistConnect) => void;

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
  setIsTabsAvailable: (value: boolean) => void;

  /**
   * Устанавливает флаг редактирования true
   */
  setIsEdit: VoidFunction;
};


export type CampaignPlaylistEditContextCommonType<T = {}> = T & CampaignPlaylistEditContextTypes & CampaignPlaylistEditContextActionsTypes;