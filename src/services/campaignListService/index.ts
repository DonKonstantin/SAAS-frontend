import { graphQLClient } from "services/graphQLClient";
import { CampaignListService } from "./CampaignListService";
import { CampaignListServiceInterface } from "./interface";

/**
 * Фабрика сервиса листинга кампаний
 * @returns
 */
export const campaignListService: () => CampaignListServiceInterface = () =>
  new CampaignListService(graphQLClient());