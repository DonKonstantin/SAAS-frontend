import React from 'react';
import {NextPage} from "next";
import {PageWithMetaTags} from "../../../../../components/UILayer/PageWithMetaTags";
import {PageWithChangeableMenu} from "../../../../../layouts/MenuChangeLayout";
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import {Box} from "@mui/material";

// Свойства страницы
type Props = PageWithMetaTags & PageWithChangeableMenu

// Компонент страницы проекта
const Page: NextPage<Props> = () => {
    return (
        <>
            <Box sx={{pb: 3}}>
                <Breadcrumbs/>
            </Box>
            <p>Раздел находится в разработке</p>
        </>
    )
}

// Экспортируем основные параметры страницы
Page.getInitialProps = async () => ({
    title: "Плейлисты",
    header: "Плейлисты",
    pageMenuType: "project",
})

// Экспортируем компонент
export default Page