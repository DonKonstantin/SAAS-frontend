import {Authorization} from "../../../../reduxStore/stores/Authorization";
import React from "react";
import {ReduxStore} from "../../../../reduxStore/ReduxStore";
import SearchComponent from "../../../../components/UILayer/TopPanel/Search";
import {connect} from "react-redux";

// Свойства контейнера
interface SearchProps {
    auth: Authorization
}

/**
 * Контейнер поиска
 */
class SearchContainer extends React.Component<SearchProps> {
    /**
     * Мапит текущий Redux state в свойства компонента
     *
     * @param store
     * @param globalProperties
     */
    static mapStoreToProperties(
        store: ReduxStore,
        globalProperties: Partial<SearchProps>
    ): Partial<SearchProps> {
        return {
            ...globalProperties,
            auth: store.Authorization
        }
    }

    /**
     * Рендеринг компонента
     */
    render() {
        const permissions: string[] = this.props.auth
            ? (this.props.auth.user ? this.props.auth.user.permissions : [])
            : []
        ;

        if (0 === permissions.length || permissions.indexOf(`SEARCH_ENTITIES`) === -1) {
            return null
        }

        return <SearchComponent />
    }
}

// Подключаем Redux к компоненту и экспортируем его
export default connect(SearchContainer.mapStoreToProperties)(SearchContainer);