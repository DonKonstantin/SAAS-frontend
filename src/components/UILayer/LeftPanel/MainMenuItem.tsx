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
            disableActiveState = false,
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

        const {href, as} = typeof link === "function" ? link() : link

        return router.push(href, as)
    }

    const pathNames = router.pathname.split('/').filter((x) => x);
    const paths: string[] = []

    let path = ``
    for (let i = 0; i < pathNames.length; i++) {
        path = `${path}/${pathNames[i]}`
        paths.push(`${path}`)
    }

    const routes = [...paths, router.asPath, router.pathname]
    const {href = "-", as = "-"} = typeof link === "function" ? link() : (link || {})

    const isActive = !disableActiveState && (link ? routes.includes(href) || routes.includes(as) : false)
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
    const route = useRouter();
    const {
        item: {
            title,
            icon: IconComponent,
            subItems,
        }
    } = props
    // ищем возможные вложенные пункты меню
    const childPathNames = subItems?.map(({link}) => typeof link === "function" ? link().href : link?.href)
    const isOpen = childPathNames.length > 0 && !!childPathNames.find(path => path && path.search(new RegExp(route.pathname)) === 0);
    const [isExpanded, setIsExpanded] = useState(isOpen);

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
