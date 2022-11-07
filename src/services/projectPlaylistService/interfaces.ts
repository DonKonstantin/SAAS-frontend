import { MediaFilesDoubles } from "services/MediaLibraryService/interface";

export interface ProjectPlaylistServiceInterface {
  /**
   * Получаем сведения о файлах плэйлистов по ID плэйлиста
   */
  getFiles: (playlistId: string) => Promise<ProjectPlayListFile[]>;

  /**
   * Получаем сведения о файлах плэйлистов по массиву ID плэйлистов
   */
  getFilesByPlaylistIds: (playlistIds: string[]) => Promise<GetPlaylistFilesByPlaylistIdsQueryResponse>;

  /**
   * Получаем список проектов по ID плэйлистов
   */
  getCampaigns: (playlistsIDs: string[]) => Promise<PlaylistCampaignsNameType[]>;

  /**
   * Экспорт плэйлистов
   */
  storePlaylist: (playlists: ExportedPlaylistType, playlistFiles: MediaFilesDoubles[], projectId: string) => Promise<string[]>;

  /**
   * Обновление связных компаний
   */
  refreshCampaigns: (playlistIds: string[]) => Promise<boolean>;

  /**
   * Копирование плейлистов
   */
  copyPlaylists: (playlists: ProjectPlayListInputObject[]) => Promise<string[]>;

  /**
   * Сохраняем изменения в плэйлисте
   */
  storePlaylistChanges: (playlist: ProjectPlayListInputObject) => Promise<ProjectPlayList>;

  /**
   * Получаем список ID кампаний по имени
   */
  getCampaignsIdByName: (campaignName: string, projectId: string) => Promise<string[]>;

  /**
   * Получаем список ID плэйлистов по списку ID кампаний
   */
  getPlaylistsIdByCampignsId: (campignsId: string[]) => Promise<string[]>;

  /**
   * Получаем список плейлистов по названию
   */
  getPlaylistsByName: (name: string) => Promise<PlaylistsResponseType[]>;

  /**
   * Создание плейлиста по загрузке файла
   */
  storePlaylistByFile: (playlistFiles: MediaFilesDoubles[], projectId: number) => Promise<ProjectPlayList>;
}

export type ExportedPlaylistType = { [x: string]: string[] };

//  Список типов файла
export type PlaylistGlobalFileLicenseType = 'rao_voice' | 'sparx' | 'amurco';

//  Сущность файла из глобальной медиа библиотеки
export interface PlaylistGlobalFile {
  album: string;                                  //  Альбом
  artist: string;                                 //  Исполнитель
  bpm: number;                                    //  Beats per minute (темп)
  composer: string;                               //  Автор музыки
  creation_date: Date;                            //  Дата создания файла
  creator: string;                                //  ID пользователя, создавшего файл
  duration: number;                               //  Длительность композиции
  file_name: string;                              //  Название файла
  genre: string;                                  //  Жанр
  hash_sum: string;                               //  Контрольная сумма для файла
  id: string;                                     //  ID сущности
  isrc: string;                                   //  Международный стандартный номер аудио/видео записи
  language: string;                               //  Язык исполнения
  last_change_date: Date;                         //  Дата последнего редактирования файла
  last_editor: string;                           //  ID пользователя, последним редактировавшего файл
  license_type?: PlaylistGlobalFileLicenseType;   //  Тип лицензии
  lyricist: string;                              //  Автор текста
  mime_type: string;                             //  Тип (MIME) файла
  obscene: boolean;                              //  Ненормативная лексика
  origin_name: string;                           //  Оригинальное название файла
  publisher: string;                             //  Изготовитель фонограммы
  title: string;                                 //  Название
  year: number;                                   //  Год создания
}

//  Сущность файла из плейлиста проекта
export interface ProjectPlayListFile {
  file: PlaylistGlobalFile;                       //  Файл из глобальной медиа библиотеки (сокращенные данные)
  file_id: string;                               //  Идентификатор файла из глобальной медиа библиотеки
  id?: string;                                   //  ID сущности
  playlist_id: string;                           //  Идентификатор плейлиста, к которому относится файл
  volume: number;                                 //  Громкость звука файла в плейлисте
  sort: number;                                   //  Порядок сортировки
}

//  Дни недели кампании
export type CampaignDaysType =
  'daily'           //  Ежедневно
  | 'daysOfTheWeek';//  По дням

//  После окончания кампании
export type CampaignEndType =
  'break'           //  Прервать немедленно
  | 'finish';       //  Закончить трек

//  Кампании с меньшим приоритетом
export type CampaignLowPriority =
  'break'           //  Прервать немедленно
  | 'finish';       //  Закончить трек

//  Типы времени периодического воспроизведения кампании
export type CampaignPeriodType =
  'minutes'         //  минуты
  | 'hours';        //  часы

//  Воспроизведение
export type CampaignPlayType =
  'periodic'        //  Подряд
  | 'continuous';   //  Перемешать

//  Типы приоритета кампании
export type CampaignPriority =
  'low'             //  Низкий
  | 'normal'        //  Обычный
  | 'high'          //  Высокий
  | 'higher'        //  Наивысший
  | 'background';   //  Перемешать

//  Типы кампаний
export type CampaignType =
  'simple'          //  Обычная
  | 'mute';         //  Mute

//  Типы порядка воспроизведения
export type CampaignPlayOrder =
  'byOrder'         //  Подряд
  | 'mix';          //  Перемешать

//  Сущность дня расписания кампании проекта
export interface CampaignDay {
  day_num: number;                                    //  Порядковый номер дня [от 1 до 7]
  days_start_minutes: number;                         //  Период (начало) в мин.
  days_stop_minutes: number;                          //  Период (окончание) в мин.
  is_active: boolean;                                 //  Активность
  id?: string;                                        //  ID сущности
  campaign_id?: string                                //  Идентификатор кампании, к которой относится день расписания
}

//  Сущность кампании проекта (только базовые поля)
export interface CampaignBase {
  campaign_all_days_start_minutes: string;              //  Дни недели (начало общее) мин.
  campaign_all_days_stop_minutes: string;               //  Дни недели (окончание общее) мин.
  campaign_days_type: CampaignDaysType;                 //  Дни недели
  campaign_end_type: CampaignEndType;                   //  После окончания (Режим работы после окончания)
  campaign_low_priority_end_type: CampaignLowPriority;  //  Кампании с меньшим приоритетом
  campaign_period_start: Date;                          //  Период кампании (начало)
  campaign_period_stop: Date;                           //  Период кампании (окончание)
  campaign_play_order: CampaignPlayOrder;               //  Тип времени для периодического воспроизведения
  campaign_play_tracks_period_type: CampaignPeriodType; //  Тип времени для периодического воспроизведения
  campaign_play_tracks_period_value: string;            //  Количество времени для периодического воспроизведения
  campaign_play_tracks_quantity: string;                //  Количество треков для периодического воспроизведения
  campaign_play_type: CampaignPlayType;                 //  Воспроизведение
  campaign_priority: CampaignPriority;                  //  Приоритет - приоритет кампании
  campaign_type: CampaignType;                          //  Тип кампании
  days: CampaignDay[];                                  //  Дни расписания кампании
  id: string;                                           //  ID сущности
  name: string;                                         //  Название кампании
  project_id: string;                                   //  Идентификатор проекта, к которому относится кампания
  version: string;                                      //  Версия кампании
}

//  Сущность плейлиста проекта
export interface ProjectPlayList {
  campaigns?: CampaignBase[];                           //  Кампании, в которые включен плейлист
  duration: number;                                     //  Общая длительность плейлиста
  files: ProjectPlayListFile[];                         //  Файлы, относящиеся к плейлисту
  id?: string;                                          //  ID сущности
  is_overall_volume: boolean;                           //  Флаг, что в плейлисте используется единая громкость мелодий
  name: string;                                         //  Название плейлиста
  overall_volume: number;                               //  Общая громкость звука в плейлисте
  project_id: string;                                   //  Идентификатор проекта, к которому относится плейлист
}

//  Сущность файла из плейлиста проекта для сохранения/создания
export interface ProjectPlayListFileInputObject {
  id?: number;                                          //  Идентификатор файла
  volume: number;                                       //  Громкость звука файла в плейлисте
  fileId: number;                                       //  Идентификатор файла из глобальной медиа библиотеки
  sort: number;                                         //  Порядок сортировки
}

//  Сущность плейлиста проекта для сохранения/создания
export interface ProjectPlayListInputObject {
  files: ProjectPlayListFileInputObject[];              //  Список файлов плейлиста проекта
  id?: number;                                          //  ID сущности
  projectId: number;                                    //  Идентификатор проекта, к которому относится плейлист
  name: string;                                         //  Название плейлиста
  isOverallVolume: boolean;                             //  Флаг, что в плейлисте используется единая громкость мелодий
  overallVolume: number;                                //  Общая громкость звука в плейлисте
}

export type GetPlaylistFilesByPlaylistIdQueryParams = {
  playlistId: string;
};

export type GetPlaylistFilesByPlaylistIdQueryResponse = {
  files: {
    id: string;
    files: ProjectPlayListFile[];
  }[];
};

export type GetPlaylistFilesByPlaylistIdsQueryParams = {
  playlistIds: string[];
};

export type GetPlaylistFilesByPlaylistIdsQueryResponse = {
  files: {
    id: string;
    files: ProjectPlayListFile[];
  }[];
};

export type GetCampaignsByPlaylistIDsQueryParams = {
  playlistIds: string[];
};

export type PlaylistCampaignsNameType = {
  id: string;
  campaigns: {
    name: string;
  };
};

export type GetCampaignsByPlaylistIDsQueryResponse = {
  campaigns: PlaylistCampaignsNameType[];
};

export type RefreshCampaignsMutationParams = {
  playlistIds: string[];
};

export type RefreshCampaignsMutationResponse = {
  campaignPublishByPlaylists: boolean;
};

export type StorePlaylistMutationParams = {
  playList: ProjectPlayListInputObject;
};

export type StorePlaylistMutationResponse = {
  result: ProjectPlayList;
};

export type GetCampaignsIdByNameQueryParams = {
  campaignName: string;
  projectId: string;
};

export type GetCampaignsIdByNameQueryResponse = {
  campaignsId: {
    id: string;
  }[];
};

export type GetPlaylistsIdByCampaignsIdQueryParams = {
  campaignsId: string[];
};

export type GetPlaylistsIdByCampaignsIdQueryResponse = {
  campaignsId: string[];
};

export type PlaylistsResponseType = {
  duration: number
  files: any[]
  id: string
  is_overall_volume: boolean
  name: string
  overall_volume: number
  project_id: string
}

export type GetPlaylistsCampaignByNameParams = {
  playlistName: string;
};

export type GetPlaylistsCampaignByNameResponse = {
  playlists: PlaylistsResponseType[]
};

