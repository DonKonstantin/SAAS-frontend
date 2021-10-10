import React from "react";
import {MenuItem as Item} from "../../../../settings/menu/system";
import Divider from "@material-ui/core/Divider";
import {Collapse, createStyles, MenuList, withStyles} from "@material-ui/core";
import MenuListItem from "./MenuListItem";

// Стили компонента
const styles = createStyles({
    menuList: {
        padding: "0"
    }
})

/**
 * Свойства списка пунктов меню
 */
interface MenuListProperties {
    isVisible: boolean
    items: Item[]
    userPermissions: string[]
    classes: {
        menuList: string
    }
}

/**
 * Компонент вывода подсписка основного меню. Выводит список ссылок на страницы, указанные в конфигурации
 */
class MenuListComponent extends React.Component<MenuListProperties> {
    render() {
        return (
            <Collapse in={this.props.isVisible} timeout="auto" unmountOnExit>
                <Divider />
                <MenuList className={this.props.classes.menuList}>
                    {this.props.items.map((item, i) => (
                        <MenuListItem key={`menu-item-${i}`} item={item} userPermissions={this.props.userPermissions} />
                    ))}
                </MenuList>
            </Collapse>
        );
    }
}

// Подключаем стили к компоненту и экспортируем его
export default withStyles(styles)(MenuListComponent)