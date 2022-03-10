import React, {FC} from "react";
import {Box, Divider} from "@mui/material";
import DrawerLayer from "./DrawerLayer";
import Profile from "./Profile";
import MainMenu from "./MainMenu";
import AudioPlayerContainer from "../../AudioPlayeContainer";

// Левая панель меню
const LeftPanel: FC<{}> = () => {
    return (
        <DrawerLayer>
            <Profile/>
            <Divider/>
            <MainMenu/>
            <Divider/>
            <Box sx={{mt: "auto"}}>
                <AudioPlayerContainer/>
            </Box>
        </DrawerLayer>
    )
}

// Экспортируем компонент левой панели
export default LeftPanel

