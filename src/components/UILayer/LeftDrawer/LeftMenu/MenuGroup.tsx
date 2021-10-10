import {MenuGroup, MenuItem} from "../../../../settings/menu/system";
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import MenuListComponent from "./MenuList";
import {createStyles, withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

// Стили компонента
const styles = createStyles({
    leftIcon: {
        boxSizing: "border-box",
        justifyContent: "center",
        paddingRight: "15px",
    },
    title: {
        overflow: "hidden",
    },
    titleValue: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }
})

/**
 * Свойства списка пунктов меню
 */
interface MenuGroupProperties {
    isMenuVisible: boolean
    group: MenuGroup
    onClick: () => void
    userPermissions: string[]
    classes: {
        leftIcon: string
        title: string
        titleValue: string
    }
}

/**
 * Состояние группы
 */
interface MenuGroupState {
    isVisible: boolean
}

/**
 * Компонент вывода подсписка основного меню. Выводит список ссылок на страницы, указанные в конфигурации
 */
class MenuGroupComponent extends React.Component<MenuGroupProperties, MenuGroupState> {
    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: MenuGroupProperties) {
        super(props);
        this.state = {
            isVisible: false,
        }
    }

    /**
     * Переключение состояния текущей группы пунктов меню
     */
    private toggleGroupState() {
        this.setState({
            isVisible: !this.state.isVisible
        })

        this.props.onClick()
    }

    /**
     * Проверяет права доступа пользователя на группу меню
     */
    private isUserHasAccessToGroup() {
        return this.props.group.items.reduce((result: boolean, item: MenuItem): boolean => {
            if (this.props.userPermissions.indexOf(item.permission) != -1) {
                return true
            }

            return result || false
        }, false)
    }

    /**
     * Рендеринг компонента
     */
    render() {
        if (!this.isUserHasAccessToGroup()) {
            return null
        }

        const isVisible = this.props.isMenuVisible && this.state.isVisible
        const Icon = this.props.group.icon
        return (
            <React.Fragment>
                <ListItem button key={this.props.group.title} onClick={() => this.toggleGroupState()}>
                    <ListItemIcon className={this.props.classes.leftIcon}><Icon/></ListItemIcon>
                    <ListItemText className={this.props.classes.title} primary={(
                        <div className={this.props.classes.titleValue}>{this.props.group.title}</div>
                    )} />
                    {isVisible ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
                </ListItem>
                <MenuListComponent isVisible={isVisible} items={this.props.group.items} userPermissions={this.props.userPermissions} />
                <Divider />
            </React.Fragment>
        )
    }
}

// Подключаем стили компонента
export default withStyles(styles)(MenuGroupComponent)