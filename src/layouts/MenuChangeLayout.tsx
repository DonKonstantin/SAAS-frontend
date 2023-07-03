import React, {FC} from "react";
import MainMenuInitializer from "../components/UILayer/LeftPanel/MainMenuInitializer";

// Свойства страницы с левым меню
export type PageWithChangeableMenu = Partial<{
    pageMenuType: "realm" | "domain" | "project"
}>

// Свойства слоя
type MenuChangeLayoutProps = PageWithChangeableMenu & {
    children: React.ReactNode
}

// Компонент вывода слоя определния открытого меню в левом сайдбаре
const MenuChangeLayout: FC<MenuChangeLayoutProps> = props => {
    const {pageMenuType = "realm", children} = props

    return (
        <>
            <MainMenuInitializer pageMenuType={pageMenuType} />
            {children}
        </>
    )
}

// Экспортируем компонент
export default MenuChangeLayout