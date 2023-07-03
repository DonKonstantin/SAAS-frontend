import { Axios } from "axios";
import { graphQLClient } from "services/graphQLClient";
import { ProjectReportsServiceInterface } from "./interface";
import ProjectReportsService from "./ProjectReportsService";
import getConfig from "next/config";

const {
  publicRuntimeConfig: {
    reportsUrl,
    reportsApiVersion,
  }
} = getConfig();

const baseURL = `${reportsUrl}/api/${reportsApiVersion}/`;

/**
 * Фабрика сервиса отчетов проекта
 * @returns
 */
export const projectReportsService: () => ProjectReportsServiceInterface =
  () => {
    return new ProjectReportsService(
      graphQLClient(),
      new Axios({
        baseURL,
      })
    );
  };
