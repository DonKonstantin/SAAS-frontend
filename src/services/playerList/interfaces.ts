import {PlayerWithoutRelations} from "../playerCodeService/interfaces";

export interface PlayerListServiceInterface {
  /**
   * Запрос о компаниях для листинга плееров
   * @param playerIds
   * @param projectId
   */
  getCampaigns(playerIds: string[], projectId: string): Promise<PlayerDetails[]>;

  /**
   * Запрос паспорта объекта привязанного к плееру
   * @param playerId 
   */
  loadPlayerObjectPassport(playerId: string): Promise<ObjectPassport>;

  /**
   * Запрос паспортов объектов доступных плееру
   * @param projectId 
   */
  loadPlayerObjectPassports(projectId: string): Promise<ObjectPassport[]>;

  /**
   * Мутация сохранения плеера
   * @param playerId 
   * @param objectPassportId
   */
  savePlayer(playerId: string, objectPassportId: string): Promise<boolean>;

  /**
   * Получение списка плееров по ид проекта и ид коналов
   * @param projectId
   * @param channels
   */
  getPlayersByChannels(projectId: string, channels: string[]): Promise<PlayerWithoutRelations[]>
}

export interface Channel {
  name: string;
}

export interface PlayerChannel {
  channel: Channel;
  uploadingStatus: number;
}

export interface PlayerDetails {
  id: string;
  campaigns: PlayerChannel[];
};

export interface ObjectPassport {
  user_name: string;
  site_name: string;
  locality: string;
  id: string;
  accountant: string;
  director: string;
  project_id: string;
  rao_authors_fee_for_december: string;
  rao_authors_fee_for_on_to_eleven_months: string;
  rao_date_of_conclusion: Date;
  rao_email: string;
  rao_license_number: string;
  rao_requisites: string;
  user_inn: string;
  vois_date_of_conclusion: Date;
  vois_email: string;
  vois_fee: string;
  vois_license_number: string;
};
