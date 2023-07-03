import { graphQLClient } from "services/graphQLClient";
import { ProjectPlaylistServiceInterface } from "./interfaces";
import ProjectPlaylistService from "./ProjectPlaylistService";

/**
 * Фабрика сервиса плэйлистов
 */
const projectPlaylistService: () => ProjectPlaylistServiceInterface = () =>
  new ProjectPlaylistService(graphQLClient());

export default projectPlaylistService;
