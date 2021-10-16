import {PageWithPermissionCheck} from "../../layouts/PermissionProvider";
import {PageWithMetaTags} from "../UILayer/PageWithMetaTags";
import {Schemas} from "../../settings/schema";

// Свойства страницы с формой редактирования сущности
export type PageWithEntityEdit<T = {}> = T & PageWithPermissionCheck & PageWithMetaTags<Partial<{
    entityEditSchema: keyof Schemas
    entityEditPrimaryKey: string
}>>