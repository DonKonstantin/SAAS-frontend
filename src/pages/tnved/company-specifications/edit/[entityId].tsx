import React from "react";
import TnvedSpecificationChangePageWithoutSSR from "../../../../custom/components/TnvedSpecificationChangePage";

type Props = {
    title: string
    header: string
    entityId: string
};

/**
 * Класс страницы
 */
class Page extends React.Component<any> {
    /**
     * Предварительная загрузка данных страницы
     */
    static async getInitialProps({query}: any): Promise<Props> {
        const entityId = query.entityId as string;
        return {
            title: `Управление спецификацией #${entityId}`,
            header: `Управление спецификацией #${entityId}`,
            entityId: entityId,
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const {entityId} = this.props;
        return (
            <TnvedSpecificationChangePageWithoutSSR baseSpecificationId={entityId} />
        )
    }
}

export default Page