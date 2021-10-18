import React from 'react';
import {PageWithMetaTags} from "../components/UILayer/PageWithMetaTags";
import {NextPage} from "next";

// Свойства страницы
type Props = PageWithMetaTags

// Компонент страницы проекта
const Page: NextPage<Props> = () => {
    return (
        <div>
            <p>Раздел находится в разработке</p>
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