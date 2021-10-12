import React, {FC} from "react";
import {useRouter} from "next/router";
import UILayer from "../components/UILayer";

// Свойства слоя
export type UILayerProps = Partial<{
    title: string
    isNeedUI: boolean
    children: React.ReactNode
}>

// Слой отображения UI
const UILayout: FC<UILayerProps> = props => {
    const router = useRouter()
    let {title = "", isNeedUI, children} = props

    // Обарботка ошибки 404
    if (router.pathname === "/404") {
        title = "UI.pages.error.404"
        isNeedUI = false
    }

    // Обарботка ошибки 500
    if (router.pathname === "/500") {
        title = "UI.pages.error.500"
        isNeedUI = false
    }

    return (
        <UILayer title={title} isNeedUI={isNeedUI}>
            {children}
        </UILayer>
    )
}

// Экспортируем компонент
export default UILayout