import {OverridableComponent} from "@mui/types";
import {SvgIconTypeMap} from "@mui/material";

/**
 * Пункт меню
 */
export type MenuItem = {
    link?: {
        href: string,
        as?: string,
    }
    onClick?: {(): void}
    title: string
    permission?: string
    level?: "realm" | "domain" | "project"

    icon?: OverridableComponent<SvgIconTypeMap>

    subItems?: MenuItem[]
}