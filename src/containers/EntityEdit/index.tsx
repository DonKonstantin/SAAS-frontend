import {Schemas} from "../../settings/schema";
import {PageUrl} from "../../settings/pages/system/list";
import {Breadcrumb} from "../../components/Breadcrumbs";

// Дополнительные параметры, которые можно передавать в форму редактирования на уровне построения страницы
export type AdditionEditParams = Partial<{
    defaultValues: { [K in keyof Schemas[keyof Schemas]['fields']]: any }
    closeUrl: PageUrl
    isNeedCloseWindowAfterExit: boolean
    customBreadcrumbs: Breadcrumb[]
}>