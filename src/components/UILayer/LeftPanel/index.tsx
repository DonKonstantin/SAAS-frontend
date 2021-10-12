import React, {FC} from "react";
import {Divider} from "@mui/material";
import DrawerLayer from "./DrawerLayer";
import Profile from "./Profile";
import MainMenu from "./MainMenu";

// Левая панель меню
const LeftPanel: FC<{}> = () => {
    return (
        <DrawerLayer>
            <Profile/>
            <Divider/>
            <MainMenu/>
        </DrawerLayer>
    )
}

// Экспортируем компонент левой панели
export default LeftPanel

