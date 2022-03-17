import React, {FC} from "react";
import {CSSObject, styled} from "@mui/material/styles";
import {Box} from "@mui/system";
import {Divider, Drawer, IconButton, Tooltip, Typography} from "@mui/material";
import clsx from "clsx";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useTranslation} from "react-i18next";

const drawerWidth = 350;

// Стилизованный Box для основного контента
const Main = styled(Box, {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Компонент вывода подвала меню
const DrawerFooter = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

// Миксин переворачивания кнопки меню
const transformMixin = (): CSSObject => ({
    transform: "rotate(180deg)",
});

// Компонент вывода переворачиваемой кнопки в левом меню
const MenuButton = styled(IconButton)(() => ({
    '&.closed': transformMixin()
}));

// Свойства компонента
type FilterDrawerProps = {
    isOpen: boolean
    onChangeOpen: { (): void }

    children: React.ReactNode
    filterContent?: React.ReactNode
}

// Компонент вывода панели фильтра
const FilterDrawer: FC<FilterDrawerProps> = props => {
    const {
        isOpen,
        onChangeOpen,
        children,
        filterContent
    } = props

    const {t} = useTranslation()
    return (
        <>
            <Main open={isOpen}>
                {children}
            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        height: "100vh",
                    },
                }}
                variant="persistent"
                anchor="right"
                open={isOpen}
            >
                <Box sx={{p: 3, flex: "1 1 0", overflowY: "auto"}}>
                    <Box sx={{pb: 3}}>
                        <Typography color="primary">Параметры фильтрации</Typography>
                    </Box>
                    <Box>
                        {filterContent}
                    </Box>
                </Box>
                <Divider/>
                <DrawerFooter>
                    <Tooltip
                        title={t(`entity-list.components.filter.hide-button.${isOpen ? "hide" : "show"}`) as string}>
                        <MenuButton
                            color="primary"
                            className={clsx({"closed": !isOpen})}
                            onClick={onChangeOpen}
                        >
                            <ChevronRightIcon/>
                        </MenuButton>
                    </Tooltip>
                </DrawerFooter>
            </Drawer>
        </>
    )
}

// Экспортируем компонент
export default FilterDrawer
