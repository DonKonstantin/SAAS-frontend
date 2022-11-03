import { FileService } from "./FileService";
import { graphQLClient } from "../graphQLClient";
import { FileServiceInterface } from "./interfaces";

/**
 * Фабрика сервиса работы с фалами
 * @returns 
 */
export const fileService: () => FileServiceInterface = () =>
  new FileService(graphQLClient());
