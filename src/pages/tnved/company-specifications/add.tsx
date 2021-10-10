import React from "react";
import TnvedSpecificationCreatePageWithoutSSR from "../../../custom/components/TnvedSpecificationCreatePage";
import {onOpenPage} from "../../../custom/hoc/TnvedSpecificationCreatePageHoc";

/**
 * Класс страницы
 */
class Page extends React.Component<any> {
    /**
     * Предварительная загрузка данных страницы
     */
    static async getInitialProps(): Promise<{}> {
        return {
            "title": "Создать спецификацию товаров ТНВЭД",
            "header": "Создать спецификацию товаров ТНВЭД",
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
     * Рендеринг компонента
     */
    render() {
        return (
            <TnvedSpecificationCreatePageWithoutSSR/>
        )
    }
}

export default Page