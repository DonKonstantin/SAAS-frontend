import React from "react";
import {EditPageComponent, EditPageProps} from "../../components/EditPage";
import {ReduxStore} from "../../reduxStore/ReduxStore";
import {Action, Dispatch} from "redux";
import {dispatcher} from "../../reduxStore/actions";
import {EntityData} from "../../services/entityGetterService/interface";
import {Schemas} from "../../settings/schema";
import {editSchemaConfiguration} from "../../settings/pages";
import {EditPageConfiguration} from "../../settings/pages/system/edit";
import {connect} from "react-redux";
import {WithRouterProps} from "next/dist/client/with-router";
import {withRouter} from "next/router";
import {PageUrl} from "../../settings/pages/system/list";
import {AdditionEditParams} from "../EntityEdit";

// State контейнера
export interface EditPageState {
    cachedEditData: EntityData<keyof Schemas>
}

// Свойства контейнера
export interface PageProps extends WithRouterProps, EditPageProps {
    redirectTo: PageUrl | undefined
}

/**
 * Контейнер страницы редактирования сущности
 */
class EditPage extends React.Component<PageProps, EditPageState> {
    private configuration = editSchemaConfiguration();

    /**
     * Мапит текущий Redux state в свойства компонента
     *
     * @param store
     * @param globalProperties
     */
    static mapStoreToProperties(
        store: ReduxStore,
        globalProperties: Partial<PageProps>
    ): Partial<PageProps> {
        // @ts-ignore
        const config: EditPageConfiguration<keyof Schemas> | undefined = editSchemaConfiguration()[globalProperties.schema];
        let hasAccess: boolean = false;
        if (config) {
            hasAccess = config.editAccessRules.reduce((result: boolean, rule: string): boolean => {
                return store.Authorization.user.permissions.indexOf(rule) !== -1 && result
            }, true)
        }

        return {
            ...globalProperties,
            isChangeInProgress: store.EntityEdit.isChangeInProgress,
            isLoading: store.EntityEdit.isLoading,
            hasAccess: hasAccess,
            entityData: store.EntityEdit.data,
            validationResults: store.EntityEdit.validationResults || [],
            redirectTo: store.EntityEdit.redirectTo,
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
    static mapActionsToStore(_dispatch: Dispatch<Action>): Partial<PageProps> {
        return {
            onChangeSchemaOrPrimaryKey: (schema, primaryKey, additionEditParams) => {
                return dispatcher().dispatch<"ENTITY_EDIT_NEED_RELOAD_DATA">(
                    "ENTITY_EDIT_NEED_RELOAD_DATA",
                    {
                        schema: schema,
                        primaryKey: primaryKey,
                        additionEditParams: additionEditParams,
                    }
                )
            },
            onSave: (entityData: EntityData<keyof Schemas>, additionEditParams: AdditionEditParams) => {
                return dispatcher().dispatch<"ENTITY_EDIT_SAVE_ENTITY">(
                    "ENTITY_EDIT_SAVE_ENTITY",
                    {
                        isNeedClose: false,
                        isNeedCopy: false,
                        entityData,
                        additionEditParams,
                    }
                )
            },
            onSaveAsNew: (entityData: EntityData<keyof Schemas>, additionEditParams: AdditionEditParams) => {
                return dispatcher().dispatch<"ENTITY_EDIT_SAVE_ENTITY">(
                    "ENTITY_EDIT_SAVE_ENTITY",
                    {
                        isNeedClose: false,
                        isNeedCopy: true,
                        entityData,
                        additionEditParams,
                    }
                )
            },
            onSaveAndClose: (entityData: EntityData<keyof Schemas>, additionEditParams: AdditionEditParams) => {
                return dispatcher().dispatch<"ENTITY_EDIT_SAVE_ENTITY">(
                    "ENTITY_EDIT_SAVE_ENTITY",
                    {
                        isNeedClose: true,
                        isNeedCopy: false,
                        entityData,
                        additionEditParams,
                    }
                )
            },
            onChangeValidation: validation => {
                return dispatcher().dispatch<"ENTITY_EDIT_CHANGE_VALIDATION_RESULTS">(
                    "ENTITY_EDIT_CHANGE_VALIDATION_RESULTS",
                    validation,
                )
            }
        }
    }

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: PageProps) {
        super(props);
        this.state = {
            cachedEditData: props.entityData
        }
    }

    /**
     * При монтировании компонента сохраняем текущий EntityData в State
     */
    componentDidMount() {
        this.configuration = editSchemaConfiguration();
        this.setState({
            cachedEditData: this.props.entityData
        });

        this.handleRedirect()
    }

    /**
     * При обновлении компонента проверяем, изменился ли полученный из Redux entityData, если да,
     * сохраняем изменения в кэш, если они актуальны
     *
     * При обновлении кэшированного значения, пробрасываем изменения наверх в Redux
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: Readonly<PageProps>, prevState: Readonly<EditPageState>) {
        const entityData = JSON.stringify(this.props.entityData);
        const prevEntityData = JSON.stringify(prevProps.entityData);
        const cachedEntityData = JSON.stringify(this.state.cachedEditData);
        const prevCachedEntityData = JSON.stringify(prevState.cachedEditData);


        if (prevEntityData !== entityData && entityData !== cachedEntityData) {
            this.setState({
                cachedEditData: this.props.entityData,
            })
        }

        if (cachedEntityData !== prevCachedEntityData && cachedEntityData !== entityData) {
            setTimeout(() => {
                dispatcher().dispatch<"ENTITY_EDIT_DATA_CHANGED">(
                    "ENTITY_EDIT_DATA_CHANGED",
                    this.state.cachedEditData,
                )
            }, 50)
        }

        this.handleRedirect()
    }

    /**
     * Редирект на целевую страницу, если установлено значение ссылки
     */
    handleRedirect() {
        const redirectTo = this.props.redirectTo;
        if (!redirectTo) {
            return
        }

        // Сбрасываем ссылку, чтоб переход прошел только один раз
        dispatcher().dispatch<"ENTITY_EDIT_SET_REDIRECT_TO">(
            "ENTITY_EDIT_SET_REDIRECT_TO",
            undefined,
        );

        this.props.router.push(redirectTo.href, redirectTo.as)
    }

    /**
     * Обработка изменения данных для отображения
     * @param data
     */
    handleChangeEditData(data: EntityData<keyof Schemas>) {
        this.setState({
            ...this.state,
            cachedEditData: JSON.parse(JSON.stringify(data))
        })
    }

    /**
     * Обработка закрытия страницы редактирования
     */
    handleClose() {
        if (this.props.additionEditParams.isNeedCloseWindowAfterExit) {
            window.close();
            return
        }

        let url = this.configuration[this.props.schema]?.listPageUrl;
        if (this.props.additionEditParams.closeUrl) {
            url = {...this.props.additionEditParams.closeUrl}
        }

        if (url) {
            this.props.router.push(url.href, url.as)
        }
    }

    /**
     * Рендеринг страницы
     */
    render() {
        return (
            <EditPageComponent
                {...this.props}
                entityData={this.state.cachedEditData}
                onChangeEditData={data => this.handleChangeEditData(data)}
                onClose={() => this.handleClose()}
            />
        )
    }
}

// Подключаем Redux к странице
// @ts-ignore
export default withRouter(connect(EditPage.mapStoreToProperties, EditPage.mapActionsToStore)(EditPage));