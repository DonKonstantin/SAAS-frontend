import React, {FC} from 'react';
import {PageWithMetaTags} from "../components/UILayer/PageWithMetaTags";
import {GetServerSideProps} from "next";

// Свойства страницы
type Props = PageWithMetaTags<{}>

// Компонент главной страницы проекта
const TestPage: FC<Props> = props => {
    return (
        <div>
            <p>{props.title}</p>
        </div>
    )
}

// Получение токена восстановления пароля и проброс флага, отображающего
// форму изменения пароля
export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            title: "Test page",
        }
    }
}

// Экспортируем компонент
export default TestPage