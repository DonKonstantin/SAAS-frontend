import React from 'react';
import {NextPage} from "next";
import {PageWithMetaTags} from "../../components/UILayer/PageWithMetaTags";
import {PageWithChangeableMenu} from "../../layouts/MenuChangeLayout";
import CheckMediaFiles from "../../components/CheckMediaFiles";
import {Grid} from "@mui/material";
import Breadcrumbs from "../../components/Breadcrumbs";
import {Box} from "@mui/system";
// Свойства страницы
type Props = PageWithMetaTags & PageWithChangeableMenu

// Компонент страницы загрузки файлов в медиабиблиотеку
const Page: NextPage<Props> = () => {
    return (
        <>
            <Box
                sx={{
                    height: "100%",
                    pb: "40px",
                    display: "grid",
                    gridGap: 28,
                    gridTemplateRows: "auto 1fr"
                }}
            >
                <Grid container alignItems="center" spacing={1} >
                    <Grid item sx={{flex: "1 1 0"}}>
                        <Breadcrumbs/>
                    </Grid>
                </Grid>
                <CheckMediaFiles/>
            </Box>

        </>
    )
}

// Экспортируем основные параметры страницы
Page.getInitialProps = async () => ({
    title: "Медиабиблиотека - Проверка",
    header: "Медиабиблиотека - Проверка",
})

// Экспортируем компонент
export default Page
