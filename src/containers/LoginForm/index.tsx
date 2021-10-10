import React from "react";
import {ReduxStore} from "../../reduxStore/ReduxStore";
import {Action, Dispatch} from "redux";
import {dispatcher} from "../../reduxStore/actions";
import {connect} from "react-redux";
import {AuthServiceInterface} from "../../services/authService/interfaces";
import {authService} from "../../services/authService";
import LoginFormComponent from "../../components/LoginForm";
import Head from "next/head";

/**
 * Свойства контейнера формы авторизации
 */
interface LoginFormContainerProps {
    authService: AuthServiceInterface
    onAuthComplete: (token: string) => void
}

/**
 * State контейнера формы авторизации
 */
interface LoginFormContainerState {
    isError: boolean
}

/**
 * Контейнер формы авторизации
 */
class LoginForm extends React.Component<LoginFormContainerProps, LoginFormContainerState>  {
    /**
     * Мапит текущий Redux state в свойства компонента
     *
     * @param _store
     * @param globalProperties
     */
    static mapStoreToProperties(
        _store: ReduxStore,
        globalProperties: Partial<LoginFormContainerProps>
    ): Partial<LoginFormContainerProps> {
        return {
            ...globalProperties,
            authService: authService()
        }
    }

    /**
     * Подключение обработчиков событий к Redux store
     *
     * @param _dispatch
     */
    static mapActionsToStore(_dispatch: Dispatch<Action>): Partial<LoginFormContainerProps> {
        return {
            onAuthComplete: token => {
                dispatcher().dispatch<"AUTHORIZATION_LOGGED_IN">("AUTHORIZATION_LOGGED_IN", token)
                dispatcher().dispatch<"ENTITY_LIST_STORE_RESET">("ENTITY_LIST_STORE_RESET", undefined)
                dispatcher().dispatch<"ENTITY_EDIT_RESET_STORE">("ENTITY_EDIT_RESET_STORE", undefined)
                dispatcher().dispatch<"LANGUAGES_NEED_RELOAD_LANGUAGES">("LANGUAGES_NEED_RELOAD_LANGUAGES", token)
            }
        }
    }

    /**
     * Конструктор контейнера
     *
     * @param props
     */
    constructor(props: Readonly<LoginFormContainerProps>) {
        super(props);
        this.state = {
            isError: false
        }
    }

    /**
     * Обработка отправки формы авторизации
     *
     * @param email
     * @param password
     */
    protected onSubmit(email: string, password: string) {
        this.props.authService.Authorize(email, password)
            .then(token => {
                if (null === token) {
                    this.setState({...this.state, isError: true})

                    return
                }

                this.setState({...this.state, isError: false})
                this.props.onAuthComplete(token)
            })
            .catch(_ => {
                this.setState({...this.state, isError: true})
            })
    }

    /**
     * Сброс состояния ошибки
     */
    protected onErrorReset() {
        this.setState({...this.state, isError: false})
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>{`OnlogSystem :: Авторизация`}</title>
                    <meta property="og:title" content={`OnlogSystem :: Авторизация`} key="title" />
                </Head>
                <LoginFormComponent
                    isError={this.state.isError}
                    onErrorReset={() => this.onErrorReset()}
                    onSubmit={(email, pass) => this.onSubmit(email, pass)}
                />
            </React.Fragment>
        );
    }
}

export default connect<Partial<LoginFormContainerProps>, Partial<LoginFormContainerProps>, {}>(
    LoginForm.mapStoreToProperties,
    LoginForm.mapActionsToStore
)(LoginForm);