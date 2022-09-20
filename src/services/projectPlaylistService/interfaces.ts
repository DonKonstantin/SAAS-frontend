import { ProjectData } from "services/loaders/allDomainsAndProjects/LoaderQuery";

export interface ProjectPlaylistServiceInterface {
  /**
   * Получаем сведения о файлах плэйлистов по ID плэйлистов
   */
  getFiles: (playlistsIDs: string[]) => Promise<GetPlaylistFilesByPlaylistIDsQueryResponse>;

  /**
   * Получаем список проектов по ID плэйлистов
   */
  getProjects: (playlistsIDs: string[]) => Promise<ProjectData[]>;
};

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
  last_editor:  string;                           //  ID пользователя, последним редактировавшего файл
  license_type?: PlaylistGlobalFileLicenseType;   //  Тип лицензии
  lyricist:  string;                              //  Автор текста
  mime_type:  string;                             //  Тип (MIME) файла
  obscene:  boolean;                              //  Ненормативная лексика
  origin_name:  string;                           //  Оригинальное название файла
  publisher:  string;                             //  Изготовитель фонограммы
  title:  string;                                 //  Название
  year: number;                                   //  Год создания
};

//  Сущность файла из плейлиста проекта
export interface ProjectPlayListFile {
  file: PlaylistGlobalFile;                       //  Файл из глобальной медиа библиотеки (сокращенные данные)
  file_id:  string;                               //  Идентификатор файла из глобальной медиа библиотеки
  id?:  string;                                   //  ID сущности
  playlist_id:  string;                           //  Идентификатор плейлиста, к которому относится файл
  volume: number;                                 //  Громкость звука файла в плейлисте
};

export type GetPlaylistFilesByPlaylistIDsQueryParams = {
  playlistIds: string[];
};

export type GetPlaylistFilesByPlaylistIDsQueryResponse = {
  files: {
    id: string;
    files: ProjectPlayListFile[];
  }[];
};

export type GetProjectsByPlaylistIDsQueryParams = {
  projectIds: string[];
};

export type GetProjectsByPlaylistIDsQueryResponse = {
  projects: ProjectData[];
};