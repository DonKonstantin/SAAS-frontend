import {Schemas} from "../schema";
import {ListPageConfiguration} from "./system/list";
import {EditPageConfiguration} from "./system/edit";
import {UserConfiguration} from "./list/user";

// Параметры конфигурации листинга сущностей
export type ListSchemaConfiguration = { [P in keyof Schemas]?: ListPageConfiguration<P> }
export const listSchemaConfiguration: { (): ListSchemaConfiguration } = (): ListSchemaConfiguration => {
    return {
        user: new UserConfiguration
    }
};

// Параметры конфигурации страниц редактирования сущностей
export type EditSchemaConfiguration = { [P in keyof Schemas]?: EditPageConfiguration<P> }
export const editSchemaConfiguration: { (): EditSchemaConfiguration } = (): EditSchemaConfiguration => {
    return {}
};