import {RolesCloneService} from "./RolesCloneService";
import {RolesCloneServiceInterface} from "./interface";

// Фабрика сервиса
export const rolesCloneService: {(): RolesCloneServiceInterface} = () => {
    return new RolesCloneService
}