import { ProjectListServiceInterface } from "./interface";
import ProjectListService from "./ProjectListService";

/**
 * Фабрика сервиса списка проектов
 * @returns 
 */
const projectListService = (): ProjectListServiceInterface => new ProjectListService();

export default projectListService;