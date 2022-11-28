import { graphQLClient } from "services/graphQLClient";
import { CampaignPlaylistServiceInterface } from "./interfaces";
import CampaignPlaylistService from "./CampaignPlaylistService";

/**
 * Фабрика сервиса плэйлистов
 */
const campaignPlaylistService: () => CampaignPlaylistServiceInterface = () =>
  new CampaignPlaylistService(graphQLClient());

export default campaignPlaylistService;
