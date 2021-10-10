import React from "react";
import {MenuItem as Item} from "../../../../settings/menu/system";
import {createStyles, MenuItem, Typography, withStyles} from "@material-ui/core";
import Link from "../../../Link";

// Стили компонента
const styles = createStyles({
    item: {
        fontSize: "14px"
    },
    link: {
        color: "inherit"
    }
})

/**
 * Свойства списка пунктов меню
 */
interface MenuListItemProperties {
    item: Item
    userPermissions: string[]
    classes: {
        item: string
        link: string
    }
}

/**
 * Компонент вывода дочернего пункта меню
 */
class MenuListItem extends React.Component<MenuListItemProperties> {
    render() {
        if (this.props.userPermissions.indexOf(this.props.item.permission) == -1) {
            return null
        }

        return (
            <Link {...this.props.item.link} className={this.props.classes.link}>
                <MenuItem className={this.props.classes.item}>
                    <Typography variant="inherit" noWrap>{this.props.item.title}</Typography>
                </MenuItem>
            </Link>
        )
    }
}

// Подключаем стили к компоненту и экспортируем его
export default withStyles(styles)(MenuListItem)