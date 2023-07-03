import {OverridableComponent} from "@mui/types";
import {SvgIconTypeMap} from "@mui/material";
import {PageUrl} from "../pages/system/list";

// Тип, описывающий хлебную крошку
export type Breadcrumb = {
    icon?: OverridableComponent<SvgIconTypeMap>
    breadcrumb: string | {(): string}
    link?: PageUrl | { (pageProps: any): PageUrl }
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

// Структура страниц с хлебными крошками
export type BreadcrumbsStructure = { [T: string]: Breadcrumb }