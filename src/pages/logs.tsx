import React, {FC} from 'react';
import {PageWithMetaTags} from "../components/UILayer/PageWithMetaTags";
import {GetStaticProps} from "next";

// Свойства страницы
type Props = PageWithMetaTags

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
            title: "Логи",
            header: "Логи",
        }
    }
}

// Экспортируем компонент
export default Page