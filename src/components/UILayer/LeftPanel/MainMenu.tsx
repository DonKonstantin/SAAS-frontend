import React, {FC} from "react";
import AuthorizationHoc, {WithAuthorization} from "../../../context/AuthorizationContext";
import {List} from "@mui/material";
import MainMenuItem from "./MainMenuItem";
import {auditTime} from "rxjs";
import { getMenuItems } from "./helpers";

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

    const menuItems = getMenuItems(menuType, userInfo);

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