export interface PlayerCodeServiceInterface {
  /**
   * Проверка занят ли код в системе
   */
  checkPlayerCode: (code: string) => Promise<boolean>;

  /**
   * Получаем все доступные для проекта канала
   */
  getChannels: (projectId: string) => Promise<ProjectChannel[]>;
};

//  Сущность плеера
export interface PlayerWithoutRelations {
  authorization_token: string;              //  Токен авторизации, привязанный к плееру
  guid: string;                             //  GUID плеера
  id?: string;                              //  ID сущности
  is_active: boolean;                       //  Флаг активности плеера
  last_query: Date;                         //  Последнее обновление плеера
  last_update: Date;                        //  Последнее обновление плеера
  name: string;                             //  Название плеера
  object_passport_id: string | null;        //  Идентификатор паспорта объекта, который привязан к плееру
  player_code_id: string;                   //  Идентификатор кода плеера, к которому относится плеер
  project_id: string;                       //  Идентификатор проекта, к которому относится плеер
  uploading_status: number;                 //  Статус загрузки плеера, в %
};

//  Сущность канала проекта
export interface ProjectChannel {
  id?: string;                              //  ID сущности
  is_active: boolean;                       //  Флаг активности расписания
  name: string;                             //  Название канала
  project_id: string;                       //  Идентификатор проекта, к которому относится канал
  players?: PlayerWithoutRelations[];       //  Плееры, относящиеся к каналу
};