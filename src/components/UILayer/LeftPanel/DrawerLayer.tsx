import React, {FC} from "react";
import {Divider, IconButton, Tooltip} from "@mui/material";
import {CSSObject, styled, Theme} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import AudioPlayerContainer from "../../AudioPlayeContainer";

// Ширина панели меню
const drawerWidth = 275;

// Миксин открытия панели меню
const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

// Миксин закрытия панели меню
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(7)} + 1px)`,
    },
});

// Миксин переворачивания кнопки меню
const transformMixin = (): CSSObject => ({
    transform: "rotate(180deg)",
});

// Компонент вывода подвала меню
const DrawerFooter = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

// Компонент вывода контента меню
const DrawerContent = styled('div')(() => ({
    flex: "1 1 0",
    width: "100%",
    overflow: "hidden",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column"
}));

// Компонент стилизованного блока меню
const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

// Компонент вывода переворачиваемой кнопки в левом меню
const MenuButton = styled(IconButton)(() => ({
    '&.closed': transformMixin()
}));

// Свойства компонента
export type DrawerLayerProps = {
    children: React.ReactNode
}

// Компонент вывода слоя с панелью левого меню
const DrawerLayer: FC<DrawerLayerProps> = props => {
    const {children} = props

    // State открытости левого меню
    const [open, setOpen] = React.useState(true);

    // Обработчик переключения левого меню
    const handleDrawerToggle = () => {
        setOpen(s => !s);
    };

    const {t} = useTranslation()

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerContent>
                {children}
            </DrawerContent>
            <Divider/>
            <DrawerFooter>
                <Tooltip title={t(`UI.menu.left-menu.toggle-button.${open ? "hide" : "show"}`) as string}>
                    <MenuButton
                        color="primary"
                        className={clsx({"closed": !open})}
                        onClick={handleDrawerToggle}
                    >
                        <ChevronLeftIcon/>
                    </MenuButton>
                </Tooltip>
            </DrawerFooter>
        </Drawer>
    )
}

// Экспортируем компонент
export default DrawerLayer
