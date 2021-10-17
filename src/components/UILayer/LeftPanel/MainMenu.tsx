import React, {FC} from "react";
import AuthorizationHoc, {WithAuthorization} from "../../../context/AuthorizationContext";
import {DomainMenuItems, ProjectMenuItems, RealmMenuItems} from "../../../settings/menu";
import {MenuItem} from "../../../settings/menu/system";
import GetAvailableMenuItemsByUserInfo from "../../../services/helpers/GetAvailableMenuItemsByUserInfo";
import {List} from "@mui/material";
import MainMenuItem from "./MainMenuItem";
import {auditTime} from "rxjs";

// Свойства компонента
export type MainMenuProps = WithAuthorization<{}>

// Компонент вывода основного меню
const MainMenu: FC<MainMenuProps> = props => {
    const {
        userInfo,
        menuType,
    } = props

    if (!userInfo) {
        return null
    }

    let menuItems: MenuItem[]
    switch (menuType) {
        case "project":
            menuItems = ProjectMenuItems()
            break
        case "domain":
            menuItems = DomainMenuItems()
            break
        default:
            menuItems = RealmMenuItems()
    }

    // Фильтруем пункты меню по уровню доступа
    menuItems = GetAvailableMenuItemsByUserInfo(userInfo, menuItems)

    return (
        <List>
            {menuItems.map((item, i) => (
                <MainMenuItem item={item} key={i}/>
            ))}
        </List>
    )
}

// Экспортируем компонент основного меню
export default AuthorizationHoc(auditTime(50))(React.memo(MainMenu, (prevProps, nextProps) => {
    return prevProps.menuType === nextProps.menuType
}))