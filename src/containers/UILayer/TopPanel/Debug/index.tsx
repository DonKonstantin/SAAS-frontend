import React from "react";
import {ReduxStore} from "../../../../reduxStore/ReduxStore";
import {Action, Dispatch} from "redux";
import {dispatcher} from "../../../../reduxStore/actions";
import {connect} from "react-redux";
import {DebugComponent, DebugComponentProps} from "../../../../components/UILayer/TopPanel/Debug";

/**
 * Контейнер вывода карточки пользователя
 */
class Debug extends React.Component<DebugComponentProps> {
    /**
     * Мапит текущий Redux state в свойства компонента
     *
     * @param store
     * @param globalProperties
     */
    static mapStoreToProperties(
        store: ReduxStore,
        globalProperties: Partial<DebugComponentProps>
    ): Partial<DebugComponentProps> {
        return {
            ...globalProperties,
            isEnabled: store.Debug.isEnabled
        }
    }

    /**
     * Подключение обработчиков событий к Redux store
     *
     * @param _dispatch
     */
    static mapActionsToStore(_dispatch: Dispatch<Action>): Partial<DebugComponentProps> {
        return {
            onChangeState: (state: boolean) => dispatcher().dispatch<"DEBUG_CHANGE_STATE">("DEBUG_CHANGE_STATE", state)
        }
    }

    /**
     * Условия рендеринга компонента
     *
     * @param nextProps
     */
    shouldComponentUpdate(nextProps: Readonly<DebugComponentProps>): boolean {
        return this.props.isEnabled !== nextProps.isEnabled
    }

    /**
     * Рендеринг листинга меню
     */
    render() {
        return (<DebugComponent {...this.props}/>);
    }
}

// Подключаем Redux к компоненту и экспортируем его
export default connect(
    Debug.mapStoreToProperties,
    Debug.mapActionsToStore,
)(Debug);