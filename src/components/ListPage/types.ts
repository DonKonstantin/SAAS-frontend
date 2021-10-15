import {Schemas} from "../../settings/schema";
import {PageWithMetaTags} from "../UILayer/PageWithMetaTags";
import {PageWithPermissionCheck} from "../../layouts/PermissionProvider";

// Свойства страницы с листингом сущностей
export type PageWithEntityList<T = {}> = T & PageWithPermissionCheck & PageWithMetaTags<Partial<{
    entityListSchema: keyof Schemas
    entityListAdditionFilter: { [T: string]: any }
}>>