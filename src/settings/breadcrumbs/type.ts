import {OverridableComponent} from "@mui/types";
import {SvgIconTypeMap} from "@mui/material";
import {PageUrl} from "../pages/system/list";

// Тип, описывающий хлебную крошку
export type Breadcrumb = {
    icon?: OverridableComponent<SvgIconTypeMap>
    title: string
    link: PageUrl
}

// Структура страниц с хлебными крошками
export type BreadcrumbsStructure = {[T: string]: Breadcrumb}