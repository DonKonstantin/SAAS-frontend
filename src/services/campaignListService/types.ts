import {
  CampaignDay,
  CampaignEndType,
  CampaignPeriodType,
  CampaignPlayOrder,
  CampaignPlayType,
  CampaignPriority,
  CampaignType
} from '../projectPlaylistService/interfaces';
import { ProjectChannel } from "services/playerCodeService/interfaces";
import { CampaignBase, CampaignLowPriority, ProjectPlayListFile } from "services/projectPlaylistService/interfaces";

//  Сущность кампании проекта
export type Campaign = CampaignBase & {
  channels: ProjectChannel[];
  playlists: CampaignPlaylistConnect[];
}

//  Сущность кампании проекта
export interface CampaignInput {
  project_id: string;// Идентификатор проекта, к которому относится кампания
  campaign_play_tracks_quantity: number;//  Количество треков для периодического воспроизведения
  campaign_days_type: CampaignDaysType;// Дни недели
  campaign_low_priority_end_type: CampaignLowPriority;//  Кампании с меньшим приоритетом
  id?: number;//  ID сущности
  campaign_play_tracks_period_value: number;//  Количество времени для периодического воспроизведения
  playlists: CampaignPlaylistConnectInput[];// Плейлисты, подключенные к кампании
  campaign_play_type: CampaignPlayType;// Воспроизведение
  days: CampaignDayInput[];// Дни расписания кампании
  campaign_type: CampaignType;//  Тип кампании
  campaign_all_days_stop_minutes: number;// Дни недели (окончание общее) мин.
  channels: CampaignChannelInputObject[];//  Каналы, подключенные к кампании
  campaign_period_stop: Date | null;// Период кампании (окончание)
  campaign_all_days_start_minutes: number;//  Дни недели (начало общее) мин.
  campaign_period_start: Date | null;//  Период кампании (начало)
  campaign_priority: CampaignPriority;//  Приоритет - приоритет кампании
  campaign_play_order: CampaignPlayOrder;// Тип времени для периодического воспроизведения
  name: string;// Название кампании
  campaign_end_type: CampaignEndType;// После окончания (Режим работы после окончания)
  campaign_play_tracks_period_type: CampaignPeriodType;// Тип времени для периодического воспроизведения
}

//  Сущность дня расписания кампании проекта
export type CampaignDayInput = CampaignDay;

//  Сущность канала, подключенного к кампании проекта
export type CampaignChannelInputObject = {
  id?: number;                                              //  ID сущности
  channel_id: number;                                       // Идентификатор канала, который относится к кампании
}

//  Сущность подключенного плейлиста кампании
export interface CampaignPlaylistConnectInput {
  projectPlaylistId?: string;                               // Идентификатор плейлиста проекта
  days: CampaignPlaylistConnectDayInput[];                  // Дни расписания плейлиста
  playCounter: number;                                      //  Счетчик количества воспроизведений
  periodStop: Date;                                         // Период трансляции плейлиста: (окончание)
  shuffle: boolean;                                         // Перемешать
  periodStart: Date;                                        //  Период трансляции плейлиста: (начало)
  daysType: CampaignDaysType;                               // Дни недели
  sortOrder: number;                                        //  Порядок сортировки плейлиста
  id?: string;                                              //  ID сущности
  isCampaignTimetable: boolean;                             // Расписание, как у кампании
  allDaysStartMinutes: number;                              //  Общий период (начало) в мин.
  allDaysStopMinutes: number;                               // Общий период (окончание) в мин.
  campaignPlaylistId?: string;                              //  Идентификатор плейлиста кампании
}

//  Сущность дня расписания подключенного плейлиста кампании
export interface CampaignPlaylistConnectDayInput {
  id?: number;                                              //  ID сущности
  dayNum: number;                                           // Порядковый номер дня [от 1 до 7]
  isActive: boolean;                                        //  Активность
  daysStartMinutes: number;                                 // Период (начало) в мин.
  daysStopMinutes: number;                                  //  Период (окончание) в мин.
}

//  Сущность подключенного плейлиста кампании
export interface CampaignPlaylistConnect {
  allDaysStartMinutes: number;                              // Общий период (начало) в мин.
  allDaysStopMinutes: number;                               // Общий период (окончание) в мин.
  campaignId: string;                                       // Идентификатор кампании, к которой подключен плейлист
  campaignPlaylist?: CampaignPlayList;                      // Плейлист кампании
  campaignPlaylistId?: number;                              //  Идентификатор плейлиста кампании
  days: CampaignPlaylistConnectDay[];                       // Дни расписания плейлиста
  daysType: CampaignDaysType;                               // Дни недели
  id: string;                                              //  ID сущности
  isCampaignTimetable: boolean;                             // Расписание, как у кампании
  periodStart: Date;                                        //  Период трансляции плейлиста: (начало)
  periodStop: Date;                                         // Период трансляции плейлиста: (окончание)
  playCounter: number;                                      //  Счетчик количества воспроизведений
  projectPlaylist?: Project_PlayList;                       //  Плейлист проекта
  projectPlaylistId?: number;                               // Идентификатор плейлиста проекта
  shuffle: boolean;                                         // Перемешать
  sortOrder: number;                                        //  Порядок сортировки плейлиста
}

//  Сущность плейлиста кампании 
export interface CampaignPlayList {
  campaign_id: string;                                        //  Идентификатор кампании, к которой относится плейлист
  duration: number;                                           // Общая длительность плейлиста
  files: CampaignPlayListFileType[];                              //  Файлы, относящиеся к плейлисту
  id?: string;                                                //  ID сущности
  is_overall_volume: boolean;                                 // Флаг, что в плейлисте используется единая громкость мелодий
  name: string;                                               // Название плейлиста
  overall_volume: number;                                     // Общая громкость звука в плейлисте
  project_id: string;                                         // Идентификатор проекта, к которому относится плейлист
  sort: number;                                               // Порядок сортировки
}

//  Сущность плейлиста кампании
export interface CampaignPlayListFile {
  campaign_id: string;                                        //  Идентификатор кампании, к которой относится плейлист
  duration: number;                                           // Общая длительность плейлиста
  files: CampaignPlayListFileType[];                              //  Файлы, относящиеся к плейлисту
  id?: string;                                                //  ID сущности
  is_overall_volume: boolean;                                 // Флаг, что в плейлисте используется единая громкость мелодий
  name: string;                                               // Название плейлиста
  overall_volume: number;                                     // Общая громкость звука в плейлисте
  project_id: string;                                         //Идентификатор проекта, к которому относится плейлист
  sort: number;                                               // Порядок сортировки
}

//  Сущность файла из плейлиста кампании
export interface CampaignPlayListFileType {
  file: ProjectFile;                                          //  Файл из библиотеки проекта (сокращенные данные)
  file_id: string;                                            //  Идентификатор файла из библиотеки проекта
  id?: string;                                                //  ID сущности
  playlist_id: string;                                        //  Идентификатор плейлиста, к которому относится файл
  sort: number;                                               // Порядок сортировки
  volume: number;                                             // Громкость звука файла в плейлисте
}

//  Сущность файла проекта
export type ProjectFile = {
  composer: string;                                           // Автор музыки
  duration: number;                                           // Длительность композиции
  file_name: string;                                          //  Название файла
  hash_sum: string;                                           // Контрольная сумма для файла
  id?: string;                                                //  ID сущности
  last_change_date: Date;                                     // Дата последнего редактирования файла
  mime_type: string;                                          //  Тип (MIME) файла
  origin_name: string;                                        //  Оригинальное название файла
  project_id?: string;                                        // ID проекта
  title: string;                                              //  Название
  player_file_id: string;                                     // Идентификатор файла, отправляемый плееру
}

//  Сущность дня расписания подключенного плейлиста кампании
export type CampaignPlaylistConnectDay = {
  campaignPlaylistConnectId: string;                          //  Идентификатор подключенного плейлиста
  dayNum: number;                                             //  Порядковый номер дня [от 1 до 7]
  daysStartMinutes: number;                                   //  Период (начало) в мин.
  daysStopMinutes: number;                                    //  Период (окончание) в мин.
  id?: string;                                                //  ID сущности
  isActive: boolean;                                          //  Активность
}

//  Сущность плейлиста проекта
export interface Project_PlayList {
  campaigns: CampaignBase[];                                  //  Кампании, в которые включен плейлист
  duration: number;                                           // Общая длительность плейлиста
  files: ProjectPlayListFile[];                               // Файлы, относящиеся к плейлисту
  id?: string;                                                //  ID сущности
  is_overall_volume: boolean;                                 // Флаг, что в плейлисте используется единая громкость мелодий
  name: string;                                               // Название плейлиста
  overall_volume: number;                                     // Общая громкость звука в плейлисте
  project_id: number;                                         // Идентификатор проекта, к которому относится плейлист
}

//  Дни недели кампании
export type CampaignDaysType =
  'daily'                   //  Ежедневно
  | 'daysOfTheWeek';        //  По дням