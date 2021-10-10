import React from "react";
import {ReduxStore} from "../../../../../reduxStore/ReduxStore";
import {connect} from "react-redux";
import UIUserCardComponent, {UIUserCardComponentProperties} from "../../../../../components/UILayer/TopPanel/UserMenu/Card";
import {Action, Dispatch} from "redux";
import {dispatcher} from "../../../../../reduxStore/actions";
import {DefaultAuthorization} from "../../../../../reduxStore/reducers/defaults";

/**
 * Контейнер вывода карточки пользователя
 */
class UIUserCard extends React.Component<UIUserCardComponentProperties> {
    /**
     * Мапит текущий Redux state в свойства компонента
     *
     * @param store
     * @param globalProperties
     */
    static mapStoreToProperties(
        store: ReduxStore,
        globalProperties: Partial<UIUserCardComponentProperties>
    ): Partial<UIUserCardComponentProperties> {
        return {
            ...globalProperties,
            user: store.Authorization.user || (new DefaultAuthorization()).user
        }
    }

    /**
     * Подключение обработчиков событий к Redux store
     *
     * @param _dispatch
     */
    static mapActionsToStore(_dispatch: Dispatch<Action>): Partial<UIUserCardComponentProperties> {
        return {
            onLogout: () => dispatcher().dispatch<"AUTHORIZATION_RESET">("AUTHORIZATION_RESET", undefined)
        }
    }

    /**
     * Условия рендеринга компонента
     *
     * @param nextProps
     */
    shouldComponentUpdate(nextProps: Readonly<UIUserCardComponentProperties>): boolean {
        const user = JSON.stringify(this.props.user || {})
        const nextUser = JSON.stringify(nextProps.user || {})

        return user !== nextUser
    }

    /**
     * Рендеринг листинга меню
     */
    render() {
        if (undefined === this.props.user) {
            return null
        }

        return (<UIUserCardComponent {...this.props}/>);
    }
}

// Подключаем Redux к компоненту и экспортируем его
export default connect(
    UIUserCard.mapStoreToProperties,
    UIUserCard.mapActionsToStore,
)(UIUserCard);