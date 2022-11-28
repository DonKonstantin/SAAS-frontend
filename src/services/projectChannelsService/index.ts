import { graphQLClient } from "services/graphQLClient";
import { ProjectChannelsServiceInterface } from "./interface";
import { ProjectChannelsService } from "./ProjectChannelsService";

/**
 * Фабрика каналов проекта
 * @returns
 */
export const projectChannelsService: () => ProjectChannelsServiceInterface = () =>
  new ProjectChannelsService(graphQLClient());
