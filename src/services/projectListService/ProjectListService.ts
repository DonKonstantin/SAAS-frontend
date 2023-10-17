import { graphQLClient } from "services/graphQLClient";
import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { ProjectData } from "services/loaders/domainsAndProjects/LoaderQuery";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { ProjectListServiceInterface } from "./interface";
import GetProjectsByIdsQuery from "./Queries/GetProjectsByIdsQuery";
import {
  GetCampaignsFilesRequest,
  GetCampaignsFilesResnonce,
  GetProjectsByIdsQueryRequest,
  GetProjectsByIdsQueryResnonce,
} from "./types";
import GetCampaignsFiles from "./Queries/GetCampaignsFiles";
import { ProjectMediaFile } from "services/MediaLibraryService/interface";

/**
 * Сервис списка проектов
 */
class ProjectListService implements ProjectListServiceInterface {
  readonly #client: GraphQLClient = graphQLClient();
  readonly #logger: Logger = loggerFactory().make("Project list service");

  /**
   * Получаем список проектов по массиву ID
   * @param projectIds
   * @returns
   */
  async getProjectsByIds(projectIds: string[]): Promise<ProjectData[]> {
    this.#logger.Debug("Projects IDs: ", projectIds);

    try {
      const { projects } = await this.#client.Query<
        GetProjectsByIdsQueryRequest,
        GetProjectsByIdsQueryResnonce
      >(new GetProjectsByIdsQuery(projectIds), {});

      this.#logger.Debug("Список проектов полученный с сервера: ", projects);

      return projects;
    } catch (error) {
      this.#logger.Debug("Ошибка получения списка проектов: ", error);

      throw Error(error);
    }
  }

  /**
   * Получаем список кампаний проекта с плэйлистами собственных файлов
   * @param projectId
   * @param playlistId
   * @returns
   */
  async getCampaignsFiles(projectId: string, playlistId: string | undefined): Promise<ProjectMediaFile[]> {
    this.#logger.Debug("Получаем список кампаний проекта с плэйлистами собственных файлов");
    this.#logger.Debug("Projects ID: ", projectId);
    this.#logger.Debug("Playlist ID: ", playlistId);

    try {
      const { campaigns } = await this.#client.Query<
        GetCampaignsFilesRequest,
        GetCampaignsFilesResnonce
      >(new GetCampaignsFiles(projectId), {});

      this.#logger.Debug("Список кампаний полученный с сервера: ", campaigns);

      const files: ProjectMediaFile[] = campaigns
        //  подготавливаем общий список плейлистов кампаний
        .flatMap(campaign => campaign.playlists)
        //  убераем плейлисты без собственных треков кампании
        .filter(playlist => !!playlist.campaignPlaylist)
        //  убераем текущий плэйлист
        .filter(playlist => playlist.campaignPlaylist.id !== playlistId)
        //  вытаскиваем файлы из собственных плейлистов кампаний
        .flatMap(playlist => playlist.campaignPlaylist.files)
        //  подготавливаем формат файлов
        .map(file => ({
          composer: file.file.composer,
          duration: file.file.duration,
          file_name: file.file.file_name,
          hash_sum: file.file.hash_sum,
          last_change_date: file.file.last_change_date,
          mime_type: file.file.mime_type,
          origin_name: file.file.origin_name,
          player_file_id: Number(file.file.player_file_id),
          title: file.file.title,
          id: Number(file.file.id || "0"),
          project_id: Number(file.file.project_id || "0"),
        }));

      return files;
    } catch (error) {
      this.#logger.Debug("Ошибка получения списка кампаний: ", error);

      throw Error(error);
    }
  }
}

export default ProjectListService;
