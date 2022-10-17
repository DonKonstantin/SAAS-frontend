export interface PlayerListServiceInterface {
  /**
   * Запрос о компаниях для листинга плееров
   * @param playerIds
   * @param projectId
   */
  getCampaigns(playerIds: string[], projectId: string): Promise<PlayerDetails[]>;
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
