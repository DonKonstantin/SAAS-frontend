import React from 'react';
import RoutesCalculatorContainer from "../../custom/containers/RoutesCalculatorContainer";

/**
 * Класс индексной страницы
 */
class RoutesCalculatorPage extends React.Component<any> {
    /**
     * Предварительная загрузка данных страницы
     */
    static async getInitialProps(): Promise<{}> {
        return {
            header: "Тестирование расчета маршрутов",
            title: "Тестирование расчета маршрутов",
            isNeedLoadRouteCalculatorData: true,
        }
    }

    /**
     * Рендеринг страницы
     */
    render() {
        return (
            <RoutesCalculatorContainer />
        )
    }
}

export default RoutesCalculatorPage