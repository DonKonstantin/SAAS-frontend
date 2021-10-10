import React from 'react';
import ShouldersImportCreatePage from "../../../custom/containers/ShouldersImportCreatePage";

/**
 * Класс страницы
 */
class Page extends React.Component<any> {
    /**
     * Предварительная загрузка данных страницы
     */
    static async getInitialProps(): Promise<{}> {
        return {
            "title": "Создать задание импорта ставок",
            "header": "Создать задание импорта ставок",
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return <ShouldersImportCreatePage />
    }
}

export default Page