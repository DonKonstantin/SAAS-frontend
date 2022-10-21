import { graphQLClient } from "services/graphQLClient";
import { ProjectReportsServiceInterface } from "./interface";
import ProjectReportsService from "./ProjectReportsService";

/**
 * Фабрика сервиса отчетов проекта
 * @returns 
 */
export const projectReportsService: () => ProjectReportsServiceInterface = () => (
    new ProjectReportsService(graphQLClient())
);