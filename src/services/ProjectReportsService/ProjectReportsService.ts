import { ReportType } from "components/ProjectReports/types";
import { GraphQLClient } from "services/graphQLClient/GraphQLClient";
import { loggerFactory } from "services/logger";
import { Logger } from "services/logger/Logger";
import { getQuery } from "./helpers";
import { ProjectReportsServiceInterface } from "./interface";

/**
 * Сервис отчетов проекта
 */
export default class ProjectReportsService implements ProjectReportsServiceInterface {
  // Клиент GraphQL API
  private readonly client: GraphQLClient;

  //  Логгер
  private readonly logger: Logger;

  /**
   * Конструктор сервиса
   * @param client
   */
   constructor(client: GraphQLClient) {
    this.client = client;
    this.logger = loggerFactory().make(`Project reports servic`);
  }

  /**
   * Запрос листинга отчетов
   * @param reportType 
   * @param args 
   */
  async getReportsList(reportType: keyof ReportType, ...args): Promise<any> {
    this.logger.Debug("Параметры запроса: ", args);
    this.logger.Debug("Тип отчета: ", reportType);

    try {
      const response = this.client.Query<any, any>(
        getQuery(reportType, ...args)!,
        {}
      );
      
      return response;
    } catch (error) {
      this.logger.Error("Ошибка мутации обновления связных компаний: ", error);

      if (!error.errors) {
        throw error;
      }

      throw error.errors;
    }
  }
}