import {ListPageConfiguration} from "../../../settings/pages/system/list";
import {Breadcrumb} from "../../../components/Breadcrumbs";

/**
 * Набор свойств для страниц листинга сущностей
 */
export type EntityListProperties<T extends object> = T & Partial<{
    configuration: ListPageConfiguration<any>
    additionFilters: {[T: string]: string}
    customBreadCrumbs: Breadcrumb[]
}>