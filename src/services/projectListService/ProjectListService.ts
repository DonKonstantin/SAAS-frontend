import { graphQLClient } from "services/graphQLClient";
import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { ProjectData } from "services/loaders/domainsAndProjects/LoaderQuery";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { ProjectListServiceInterface } from "./interface";
import GetProjectsByIdsQuery from "./Queries/GetProjectsByIdsQuery";
import {
  GetProjectsByIdsQueryRequest,
  GetProjectsByIdsQueryResnonce,
} from "./types";

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
}

export default ProjectListService;
