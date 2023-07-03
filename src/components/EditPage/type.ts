import {PageWithPermissionCheck} from "../../layouts/PermissionProvider";
import {PageWithMetaTags} from "../UILayer/PageWithMetaTags";
import {Schemas} from "../../settings/schema";
import {PageWithChangeableMenu} from "../../layouts/MenuChangeLayout";

// Свойства страницы с формой редактирования сущности
export type PageWithEntityEdit<T = {}> = T
    & PageWithChangeableMenu
    & PageWithPermissionCheck
    & PageWithMetaTags
    & Partial<{
        entityEditSchema: keyof Schemas
        entityEditPrimaryKey: string
    }>