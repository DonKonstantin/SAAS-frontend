import LanguagesMenuComponent, {
    LanguagesMenuProps,
} from "../../../../components/UILayer/TopPanel/LangMenu";
import React from "react";
import {ReduxStore} from "../../../../reduxStore/ReduxStore";
import {Action, Dispatch} from "redux";
import {dispatcher} from "../../../../reduxStore/actions";
import {connect} from "react-redux";

/**
 * Контейнер компонента меню языков
 */
class LanguagesMenu extends React.Component<LanguagesMenuProps>{
    /**
     * Мапит текущий Redux state в свойства компонента
     *
     * @param store
     * @param globalProperties
     */
    static mapStoreToProperties(
        store: ReduxStore,
        globalProperties: Partial<LanguagesMenuProps>
    ): Partial<LanguagesMenuProps> {
        return {
            ...globalProperties,
            primaryLangId: store.LanguagesStore.primaryLangId,
            secondaryLangId: store.LanguagesStore.secondaryLangId,
            languages: store.LanguagesStore.languages,
        }
    }

    /**
     * Подключение обработчиков событий к Redux store
     *
     * @param _dispatch
     */
    static mapActionsToStore(_dispatch: Dispatch<Action>): Partial<LanguagesMenuProps> {
        return {
            onChangePrimaryLang: id => dispatcher().dispatch<"LANGUAGES_CHANGE_PRIMARY_LANG">("LANGUAGES_CHANGE_PRIMARY_LANG", id),
            onChangeSecondaryLang: id => dispatcher().dispatch<"LANGUAGES_CHANGE_SECONDARY_LANG">("LANGUAGES_CHANGE_SECONDARY_LANG", id),
        }
    }

    /**
     * Условия рендеринга компонента
     *
     * @param nextProps
     */
    shouldComponentUpdate(nextProps: Readonly<LanguagesMenuProps>): boolean {
        if (this.props.primaryLangId !== nextProps.primaryLangId || this.props.secondaryLangId !== nextProps.secondaryLangId) {
            return true
        }

        const langs = JSON.stringify(this.props.languages)
        const nextLangs = JSON.stringify(nextProps.languages)

        return langs !== nextLangs
    }

    /**
     * Рендеринг компонента
     */
    render() {
        return (<LanguagesMenuComponent {...this.props} />);
    }
}

// Подключаем Redux к компоненту и экспортируем его
export default connect(
    LanguagesMenu.mapStoreToProperties,
    LanguagesMenu.mapActionsToStore,
)(LanguagesMenu);