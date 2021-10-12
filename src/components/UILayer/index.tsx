import React, {FC} from "react";
import {Box} from "@mui/material";
import LeftPanel from "./LeftPanel";
import {useTranslation} from "react-i18next";
import Head from "next/head";

// Свойства компонента
export type UILayerProps = {
    title: string
    children: React.ReactNode
    isNeedUI?: boolean
}

// Компонент вывода основной обертки UI
const UILayer: FC<UILayerProps> = props => {
    const {children, title, isNeedUI = true} = props

    const {t} = useTranslation()
    const titleContent = `${t(`UI.meta.title.prefix`)}${t(title)}${t(`UI.meta.title.suffix`)}`

    if (!isNeedUI) {
        return <>
            <Head>
                <title>{titleContent}</title>
                <meta property="og:title" content={titleContent} key="title"/>
            </Head>
            {children}
        </>;
    }

    return <>
        <Head>
            <title>{titleContent}</title>
            <meta property="og:title" content={titleContent} key="title"/>
        </Head>
        <Box sx={{display: 'flex'}}>
            <LeftPanel/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                {children}
            </Box>
        </Box>
    </>;
}

// Подключаем стили к компоненту и экспортируем его
export default UILayer