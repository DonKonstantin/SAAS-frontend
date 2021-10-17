import React, {FC} from 'react';
import {GetStaticProps} from "next";
import {PageWithMetaTags} from "../../../components/UILayer/PageWithMetaTags";
import {PageWithChangeableMenu} from "../../../layouts/MenuChangeLayout";

// Свойства страницы
type Props = PageWithMetaTags & PageWithChangeableMenu

// Компонент страницы проекта
const Page: FC<Props> = () => {
    return (
        <div>
            <p>Раздел находится в разработке</p>
        </div>
    )
}

// Экспортируем основные параметры страницы
export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: "Плейлисты",
            header: "Плейлисты",
            pageMenuType: "project",
        }
    }
}

// Экспортируем компонент
export default Page