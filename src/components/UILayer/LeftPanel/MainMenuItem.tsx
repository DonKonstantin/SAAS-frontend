import {FC, useState} from "react";
import {MenuItem} from "../../../settings/menu/system";
import {Collapse, Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from "clsx";

// Свойства компонента
export type MainMenuItemProps = {
    item: MenuItem
}

// Простой пункт меню, без подпунктов
const SimpleMainMenuItem: FC<MainMenuItemProps> = props => {
    const {
        item: {
            link,
            onClick,
            title,
            icon: IconComponent,
        }
    } = props

    const {t} = useTranslation()
    const router = useRouter()

    // Обработчик клика по пункту меню
    const onClickHandler = () => {
        if (!!onClick) {
            onClick()
        }

        if (!link) {
            return
        }

        router.push(link.href, link.as)
    }

    const routes = [router.asPath, router.pathname]
    const isActive = link ? routes.includes(link.href) || routes.includes(link?.as || "-") : false
    return (
        <ListItem button onClick={onClickHandler}
                  className={clsx("left-menu-item", "can-activate", {"is-active": isActive})}>
            <ListItemIcon color="inherit">
                {!!IconComponent && (
                    <IconComponent color="inherit"/>
                )}
            </ListItemIcon>
            <ListItemText primary={t(title)}/>
        </ListItem>
    )
}

// Обработчик вывода пунктов меню с дочерними элементами
const MainMenuWithSubItems: FC<MainMenuItemProps> = props => {
    const [isExpanded, setIsExpanded] = useState(false)
    const {
        item: {
            title,
            icon: IconComponent,
            subItems,
        }
    } = props

    const {t} = useTranslation()

    // Обработчик клика по пункту меню
    const onClickHandler = () => {
        setIsExpanded(s => !s)
    }

    return (
        <>
            <ListItem button onClick={onClickHandler} className={clsx("left-menu-item", {"is-active": isExpanded})}>
                <ListItemIcon color="inherit">
                    {!!IconComponent && (
                        <IconComponent color="inherit"/>
                    )}
                </ListItemIcon>
                <ListItemText primary={t(title)}/>
                <ExpandMoreIcon className={"arrow"}/>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Divider/>
                <List component="div" disablePadding>
                    {subItems?.map((item, i) => (
                        <MainMenuItem item={item} key={i}/>
                    ))}
                </List>
            </Collapse>
        </>
    )
}

// Компонент вывода пунктов меню с учетом наличия в них дочерних элементов
const MainMenuItem: FC<MainMenuItemProps> = props => {
    const {item} = props
    if (!item.subItems) {
        return <SimpleMainMenuItem item={item}/>
    }

    return <MainMenuWithSubItems item={item}/>
}

// Экспортируем компонент
export default MainMenuItem