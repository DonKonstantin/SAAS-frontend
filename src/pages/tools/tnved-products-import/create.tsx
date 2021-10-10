import React from 'react';
import CreateTnvedProductImportTaskWithoutSSR from "../../../custom/components/CreateTnvedProductImportTask";
import {onOpenPage} from "../../../custom/hoc/CreateTnvedProductImportTask/CreateTnvedProductImportHoc";

/**
 * Класс страницы
 */
class Page extends React.Component<any> {
    /**
     * Предварительная загрузка данных страницы
     */
    static async getInitialProps(): Promise<{}> {
        return {
            "title": "Создать задание импорта товаров ТНВЭД",
            "header": "Создать задание импорта товаров ТНВЭД",
        }
    }

    /**
     * При создании компонента необходимо сбросить контекст
     * @param props
     */
    constructor(props: any) {
        super(props);
        onOpenPage();
    }

    /**
     * Обработка сброса контекста при открытии страницы
     */
    componentDidMount(): void {
        onOpenPage();
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return <CreateTnvedProductImportTaskWithoutSSR/>
    }
}

export default Page