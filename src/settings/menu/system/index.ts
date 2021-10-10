import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {SvgIconTypeMap} from "@material-ui/core/SvgIcon/SvgIcon";

/**
 * Пункт меню
 */
export class MenuItem {
    link: {
        href: string,
        as?: string,
    }
    title: string
    permission: string

    /**
     * Конструктор пункта меню
     *
     * @param link
     * @param title
     * @param permission
     */
    constructor(link: {href: string, as?: string}, title: string, permission: string) {
        this.link = link
        this.title = title
        this.permission = permission;
    }
}

/**
 * Группа пунктов меню
 */
export class MenuGroup {
    title: string
    icon: OverridableComponent<SvgIconTypeMap>
    items: MenuItem[]

    /**
     * Конструктор группы пунктов меню
     *
     * @param title
     * @param icon
     * @param items
     */
    constructor(title: string, icon: OverridableComponent<SvgIconTypeMap>, items: MenuItem[]) {
        this.title = title
        this.icon = icon
        this.items = items
    }
}