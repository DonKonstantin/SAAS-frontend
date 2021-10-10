import {AllowanceTypeServiceInterface} from "./interfaces";
import {AllowanceTypeService} from "./AllowanceTypeService";

/**
 * Фабрика сервиса
 * @param token
 */
export const allowanceTypeService: {(token?: string): AllowanceTypeServiceInterface} = token => (
    new AllowanceTypeService(token)
)