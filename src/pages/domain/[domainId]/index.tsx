import React from 'react';
import {NextPage} from "next";
import { PageWithMetaTags } from 'components/UILayer/PageWithMetaTags';

// Свойства страницы
type Props = PageWithMetaTags

// Компонент главной страницы проекта
const IndexPage: NextPage<Props> = () => {
    return (
        <div>
            <p>Раздел находится в разработке</p>
        </div>
    )
}

// Экспортируем основные параметры страницы
IndexPage.getInitialProps = async () => ({
    title: "pages.main.title",
    header: "pages.main.header",
})

// Экспортируем компонент
export default IndexPage