import React from 'react';
import {PageWithMetaTags} from "../components/UILayer/PageWithMetaTags";
import {NextPage} from "next";
import LogsListPage from "../components/LogsListPage";

// Свойства страницы
type Props = PageWithMetaTags

// Компонент страницы проекта
const Page: NextPage<Props> = () => {
    return (
        <div>
            <LogsListPage/>
        </div>
    )
}

// Экспортируем основные параметры страницы
Page.getInitialProps = async () => ({
    title: "Логи",
    header: "Логи",
})

// Экспортируем компонент
export default Page
