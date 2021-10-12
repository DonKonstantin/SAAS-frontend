import React from 'react';
import {clientServerDetector} from "../../services/clientServerDetector";
import {withRouter} from "next/router";
import {WithRouterProps} from "next/dist/client/with-router";
import {PageWithMetaTags} from "../../containers/UILayer/PageWithMetaTags";

// Свойства страницы
type Props = PageWithMetaTags<{
    changePasswordToken: string
    isNeedShowChangePassword: boolean
}>

/**
 * Класс страницы восстановления пароля
 */
class ChangePasswordPage extends React.Component<WithRouterProps & Props> {
    /**
     * Получение токена восстановления пароля из URL
     * @param query
     */
    static async getInitialProps({query}: any): Promise<Props> {
        return {
            changePasswordToken: query.changePwdToken,
            isNeedShowChangePassword: true,
            title: "UI.login.change-password.title",
            header: "UI.login.change-password.title",
        }
    }

    /**
     * Редиректим пользователя при прохождении изменения пароля на главную страницу
     */
    componentDidMount() {
        if (clientServerDetector().isServer()) {
            return
        }

        // Используем внутренний редирект
        this.props.router.replace("/")
    }

    /**
     * Рендеринг страницы
     */
    render() {
        return null
    }
}

// Экспортируем компонент
export default withRouter(ChangePasswordPage)