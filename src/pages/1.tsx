import React, {FC} from 'react';
import {GetStaticProps} from "next";
import {PageWithMetaTags} from "../components/UILayer/PageWithMetaTags";

// Свойства страницы
type Props = PageWithMetaTags<{}>

// Компонент главной страницы проекта
const TestPage: FC<Props> = () => {
    return (
        <div>
            <p>Test</p>
        </div>
    )
}

// Загрузка данных CRM на стороне сервера
export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: "Test page",
        }
    }
}

// Экспортируем компонент
export default TestPage