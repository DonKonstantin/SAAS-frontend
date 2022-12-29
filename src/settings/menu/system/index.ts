import {OverridableComponent} from "@mui/types";
import {SvgIconTypeMap} from "@mui/material";
import {PageUrl} from "../../pages/system/list";

/**
 * Пункт меню
 */
export type MenuItem = {
    link?: PageUrl | {(): PageUrl};
    onClick?: {(): void};
    title: string;
    permission?: string;
    level?: "realm" | "domain" | "project";
    disableActiveState?: boolean;
    checkIncludes?: boolean;  //  нужна проверка на наличие пунктов вложенного меню, если их нет то не выводить

    icon?: OverridableComponent<SvgIconTypeMap>;

    subItems?: MenuItem[];
}