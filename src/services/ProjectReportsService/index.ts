import { Axios } from "axios";
import { graphQLClient } from "services/graphQLClient";
import { ProjectReportsServiceInterface } from "./interface";
import ProjectReportsService from "./ProjectReportsService";

/**
 * Фабрика сервиса отчетов проекта
 * @returns
 */
export const projectReportsService: () => ProjectReportsServiceInterface =
  () => {
    return new ProjectReportsService(
      graphQLClient(),
      new Axios({
        baseURL: 'https://reports.dev.saas.systems-fd.net/api/v1/',
      })
    );
  };
