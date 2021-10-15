import {Schemas} from "../schema";
import {ListPageConfiguration} from "./system/list";
import {EditPageConfiguration} from "./system/edit";
import {UserListingConfiguration} from "./list/user";
import {PermissionCategoryListingConfiguration} from "./list/permission_category";
import {PermissionListingConfiguration} from "./list/permission";
import {RoleListingConfiguration} from "./list/role";
import {DomainListingConfiguration} from "./list/domain";
import {ProjectListingConfiguration} from "./list/project";

// Параметры конфигурации листинга сущностей
export type ListSchemaConfiguration = { [P in keyof Schemas]?: ListPageConfiguration<P> }
export const listSchemaConfiguration: { (): ListSchemaConfiguration } = (): ListSchemaConfiguration => {
    return {
        user: new UserListingConfiguration,
        permission_category: new PermissionCategoryListingConfiguration,
        permission: new PermissionListingConfiguration,
        role: new RoleListingConfiguration,
        domain: new DomainListingConfiguration,
        project: new ProjectListingConfiguration,
    }
};

// Параметры конфигурации страниц редактирования сущностей
export type EditSchemaConfiguration = { [P in keyof Schemas]?: EditPageConfiguration<P> }
export const editSchemaConfiguration: { (): EditSchemaConfiguration } = (): EditSchemaConfiguration => {
    return {}
};