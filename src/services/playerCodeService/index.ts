import { graphQLClient } from "services/graphQLClient";
import { PlayerCodeServiceInterface } from "./interfaces";
import { PlayerCodeService } from "./PlayerCodeService";

/**
 * Фабрика сервиса кодов плееров
 * @returns
 */
export const playerCodeService: () => PlayerCodeServiceInterface = () =>
  new PlayerCodeService(graphQLClient());
