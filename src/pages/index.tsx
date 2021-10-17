import React, {FC} from 'react';
import {PageWithMetaTags} from "../components/UILayer/PageWithMetaTags";
import {GetStaticProps} from "next";

// Свойства страницы
type Props = PageWithMetaTags

// Компонент главной страницы проекта
const IndexPage: FC<Props> = () => {
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
            title: "pages.main.title",
            header: "pages.main.header",
        }
    }
}

// Экспортируем компонент
export default IndexPage