import React from "react";
import ListPageComponent, {ListPageProps} from "../../components/ListPage";
import {ReduxStore} from "../../reduxStore/ReduxStore";
import {Action, Dispatch} from "redux";
import {dispatcher} from "../../reduxStore/actions";
import {connect} from "react-redux";
import {withRouter} from 'next/router';
import {ListOfSchema} from "../../reduxStore/stores/EntityList";
import {Schemas} from "../../settings/schema";

// State контейнера
interface PageState {
    cachedEntityList: ListOfSchema<keyof Schemas>
}

/**
 * Компонент вывода страницы листинга сущностей
 */
class ListPage extends React.Component<ListPageProps, PageState> {
    /**
     * Мапит текущий Redux state в свойства компонента
     *
     * @param store
     * @param globalProperties
     */
    static mapStoreToProperties(
        store: ReduxStore,
        globalProperties: Partial<ListPageProps>
    ): Partial<ListPageProps> {
        //@ts-ignore
        const entityList = store.EntityList.loaded ? store.EntityList.loaded[globalProperties.schema] : undefined;
        return {
            ...globalProperties,
            // @ts-ignore
            entityList: entityList,
            isChangeInProgress: store.EntityList.isChangeInProgress,
            isListReloading: store.EntityList.isListReloading,
            isLoading: store.EntityList.isLoading,
            hasReadAccess: store.Authorization.user.permissions.indexOf(globalProperties.configuration?.readPermission || "") !== -1,
            hasEditAccess: store.Authorization.user.permissions.indexOf(globalProperties.configuration?.editPermission || "") !== -1,
            mainLangId: store.LanguagesStore.primaryLangId,
            secondaryLangId: store.LanguagesStore.secondaryLangId,
            languages: store.LanguagesStore.languages,
        }
    }

    /**
     * Подключение обработчиков событий к Redux store
     *
     * @param _dispatch
     */
    static mapActionsToStore(_dispatch: Dispatch<Action>): Partial<ListPageProps> {
        return {
            onChangeSchema: (requiredSchema: keyof Schemas, additionFilter: { [T: string]: string }) => {
                dispatcher().dispatch<"ENTITY_LIST_NEED_LOAD_SCHEMA_BASE_DATA">(
                    "ENTITY_LIST_NEED_LOAD_SCHEMA_BASE_DATA",
                    {schema: requiredSchema, additionFilter}
                )
            },
            onDeleteItems: (data, items) => {
                dispatcher().dispatch<"ENTITY_LIST_REMOVE_ENTITIES">(
                    "ENTITY_LIST_REMOVE_ENTITIES", {
                        data: data,
                        items: items
                    }
                )
            },
            onEntityChange: (entityList, eventType, changedRow) => {
                dispatcher().dispatch<"ENTITY_LIST_PROCESS_DATA_CHANGES_BY_WSS">(
                    "ENTITY_LIST_PROCESS_DATA_CHANGES_BY_WSS",
                    {
                        changedRow: changedRow,
                        data: entityList,
                        eventType: eventType,
                    },
                )
            }
        }
    }

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: ListPageProps) {
        super(props);
        this.state = {
            cachedEntityList: props.entityList
        }
    }

    /**
     * При монтировании компонента сохраняем текущий EntityList в State
     */
    componentDidMount() {
        this.setState({
            cachedEntityList: this.props.entityList
        })
    }

    /**
     * При обновлении компонента проверяем, изменился ли полученный из Redux entityList, если да,
     * сохраняем изменения в кэш, если они актуальны
     *
     * При обновлении кэшированного значения, пробрасываем изменения наверх в Redux
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: Readonly<ListPageProps>, prevState: Readonly<PageState>) {
        const entityList = JSON.stringify(this.props.entityList);
        const prevEntityList = JSON.stringify(prevProps.entityList);
        const cachedEntityList = JSON.stringify(this.state.cachedEntityList);
        const prevCachedEntityList = JSON.stringify(prevState.cachedEntityList);


        if (prevEntityList !== entityList && entityList !== cachedEntityList) {
            this.setState({
                cachedEntityList: this.props.entityList,
            })
        }

        if (cachedEntityList !== prevCachedEntityList && cachedEntityList !== entityList) {
            setTimeout(() => {
                dispatcher().dispatch<"ENTITY_LIST_STORE_CHANGE_SCHEMA_DATA">(
                    "ENTITY_LIST_STORE_CHANGE_SCHEMA_DATA", {
                        data: this.state.cachedEntityList,
                        schema: this.props.schema
                    }
                )
            }, 50)
        }
    }

    /**
     * Обработка изменения данных схемы для отображения
     * @param data
     */
    handleChangeSchemaData(data: ListOfSchema<keyof Schemas>) {
        this.setState({
            ...this.state,
            cachedEntityList: JSON.parse(JSON.stringify(data))
        })
    }

    /**
     * Рендеринг страницы
     */
    render() {
        return (
            <ListPageComponent
                {...this.props}
                entityList={this.state.cachedEntityList}
                onChangeSchemaData={data => this.handleChangeSchemaData(data)}
            />
        )
    }
}

// Подключаем Redux к странице
// @ts-ignore
export default withRouter(connect(ListPage.mapStoreToProperties, ListPage.mapActionsToStore)(ListPage));