import React from 'react';
import {NextPage} from "next";
import {PageWithMetaTags} from "../../../components/UILayer/PageWithMetaTags";
import {PageWithChangeableMenu} from "../../../layouts/MenuChangeLayout";

// Свойства страницы
type Props = PageWithMetaTags & PageWithChangeableMenu

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
    title: "Плейлисты",
    header: "Плейлисты",
    pageMenuType: "project",
})

// Экспортируем компонент
export default Page