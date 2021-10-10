import OrderPageWithNoSSR from "../../custom/containers/OrderPage/OrderPage";
import React from "react";
import {PageWithMetaTags} from "../../containers/UILayer/PageWithMetaTags";

// Свойства страницы
interface OrderPageProps {
    orderId: string
}

// Компонент страницы заказов
export default class extends React.Component<PageWithMetaTags<OrderPageProps>> {
    static async getInitialProps({query}: any): Promise<PageWithMetaTags<OrderPageProps>> {
        return {
            orderId: query.orderId,
            title: `Заказ #${query.orderId}`,
            header: `Заказ #${query.orderId}`,
        }
    }

    render() {
        return (
            <OrderPageWithNoSSR
                type={"preOrder"}
                orderId={this.props.orderId}
            />
        )
    }
}