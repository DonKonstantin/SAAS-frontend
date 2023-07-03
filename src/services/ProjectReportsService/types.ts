import { LicenseType } from "services/MediaLibraryService/interface";

/**
 * Общие поля для объектов статистики по прогирыванию
 */
export type PlayInfoStatistic = {
  id: string;
  name: string;
  played: number;
};

/**
 * Статистика по каналам
 */
export type ChannelPlayInfoStatistic = PlayInfoStatistic & {
  channel: {
    id: string;
    is_active: boolean;
    name: string;
    project_id: string;
  };
};

export type GlobalFilePlayInfoStatistic = PlayInfoStatistic & {
  file: ReportPlaylistGlobalFile;
};

export type ReportPlaylistGlobalFile = {
  album: string;
  artist: string;
  bpm: number;
  composer: string;
  creation_date: string;
  creator: string;
  duration: number;
  file_name: string;
  genre: string;
  hash_sum: string;
  id?: string;
  isrc: string;
  language: string;
  last_change_date: string;
  last_editor: string;
  license_type?: LicenseType;
  lyricist: string;
  mime_type: string;
  obscene: boolean;
  origin_name: string;
  publisher: string;
  title: string;
  year: number;
};

/**
 * Статистика по каналу плеера
 */
export type ReportPlayerChannel = {
  campaignId: string;
  channelId: string;
  id?: string;
  playerId: string;
};

/**
 * Статистика по плеерам
 */
export type PlayerPlayInfoStatistic = PlayInfoStatistic & {
  player: {
    authorization_token: string;
    campaigns: ReportPlayerChannel[];
    guid: string;
    id?: string;
    last_query: Date;
    last_update: Date;
    name: string;
    object_passport_id?: string;
    player_code_id: string;
    project_id: string;
  };
};

/**
 * Статистика по файлам проекта
 */
export type ProjectFilePlayInfoStatistic = PlayInfoStatistic & {};

/**
 * Параметры запроса для получения статистики
 */
export type PlayInfoStatisticQueryParams = {
    projectId: string
    from: string
    to: string
}

/**
 * Параметры запроса для получения отчета "Логи плеера"
 */
export type ReportPlayerLogsQueryParams = {
  from: Date;
  playerId: string[];
  projectId: string;
  to: Date;
};

/**
 * Параметры запроса для получения отчета "Кампании"
 */
export type ReportCampaignQueryParams = {
  campaignId: string[];
  from: Date;
  projectId: string;
  to: Date;
};

/**
 * Параметры запроса для получения отчета "Каналы"
 */
export type ReportChannelsQueryParams = {
  channelId: string[];
  from: Date;
  projectId: string;
  to: Date;
};

/**
 * Параметры запроса для получения отчета "Отчет по устройству"
 */
export type ReportDeviceQueryParams = {
  from: Date;
  playerId: string[];
  projectId: string;
  to: Date;
};

/**
 * Параметры запроса для получения отчета "Файлы"
 */
export type ReportFilesQueryParams = {
  from: Date;
  globalFileId: string[];
  projectFileId: string[];
  projectId: string;
  to: Date;
};

/**
 * Параметры запроса для получения отчета "РАО"
 */
export type ReportRaoQueryParams = {
  from: Date;
  playerId: string[];
  projectId: string;
  to: Date;
};

/**
 * Параметры запроса для получения отчета "ВОИС"
 */
export type ReportVoiceQueryParams = {
  from: Date;
  playerId: string[];
  projectId: string;
  to: Date;
};

export type GetPlayerPlayInfoStatisticResponse = {
  logs: (Omit<PlayerPlayInfoStatistic, "player"> & {
    player: Omit<PlayerPlayInfoStatistic["player"], "last_query" | "last_update"> & {
      last_query: string;
      last_update: string;
    };
  })[];
};
