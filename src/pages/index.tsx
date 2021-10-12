import React from 'react';
import {PageWithMetaTags} from "../containers/UILayer/PageWithMetaTags";

// Свойства страницы
type Props = PageWithMetaTags<{}>

/**
 * Класс индексной страницы
 */
class IndexPage extends React.Component<Props> {
    /**
     * Получение токена восстановления пароля из URL
     */
    static async getInitialProps(): Promise<Props> {
        return {
            title: "pages.main.title",
            header: "pages.main.header",
        }
    }

    /**
     * Рендеринг страницы
     */
    render() {
        return (
            <div>
                <p>Раздел находится в разработке</p>
            </div>
        )
    }
}

export default IndexPage