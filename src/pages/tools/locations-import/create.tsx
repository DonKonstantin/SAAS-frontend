import React from 'react';
import LocationsImportCreatePage from "../../../custom/containers/LocationsImportCreatePage";

/**
 * Класс страницы
 */
class Page extends React.Component<any> {
    /**
     * Предварительная загрузка данных страницы
     */
    static async getInitialProps(): Promise<{}> {
        return {
            "title": "Создать задание импорта гео-объектов",
            "header": "Создать задание импорта гео-объектов",
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return <LocationsImportCreatePage />
    }
}

export default Page