import React from 'react';
import {Schemas} from "../../settings/schema";
import {ListOfSchema} from "../../reduxStore/stores/EntityList";
import LoadingBlocker from "../LoadingBlocker";
import ListComponent from "./List";
import {OrderParameter} from "../../services/listDataLoader/listLoader/interfaces";
import {ListPageConfiguration, PageUrl} from "../../settings/pages/system/list";
import {Fab, Grid, Grow, Slide, Tooltip, Typography} from "@mui/material";
import {DeleteDialog} from "./DeleteDialog";
import SettingsBlock from "./SettingsBlock";
import {listSchemaConfiguration} from "../../settings/pages";
import {WithRouterProps} from "next/dist/client/with-router";
import {clientServerDetector} from "../../services/clientServerDetector";
import FilterComponent from "./Filter";
import clsx from "clsx";
import {LoadedFilterData} from "../../services/listDataLoader/filterLoader/interfaces";
import {FilterFieldComponents} from "../../services/listDataLoader/filterLoader/types";
import BreadcrumbsComponent, {Breadcrumb} from "../Breadcrumbs";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {ListFieldRow, ListResponse} from "../../services/listDataLoader/listLoader/types";
import SubscriptionComponent from "./Subscription";

// Свойства страницы листинга сущностей
export interface ListPageProps extends WithRouterProps {
    schema: keyof Schemas
    additionFilter: {[T: string]: string}
    customBreadCrumbs?: Breadcrumb[]
    configuration: ListPageConfiguration<keyof Schemas>
    mainLangId: string
    secondaryLangId: string
    isLoading: boolean
    isListReloading: boolean
    isChangeInProgress: boolean
    hasReadAccess: boolean
    hasEditAccess: boolean
    entityList: ListOfSchema<keyof Schemas>
    onChangeSchema: {(requiredSchema: keyof Schemas, additionFilter: {[T: string]: string}): void}
    onChangeSchemaData: {(data: ListOfSchema<keyof Schemas>): void}
    onDeleteItems: {(data: ListOfSchema<keyof Schemas>, items: any[]): void}
    onEntityChange: {
        <T extends keyof Schemas>(
            entityList: ListOfSchema<keyof Schemas>,
            eventType: "updated" | "deleted",
            changedRow: ListFieldRow<T>
        ): void
    }
}

// State компонента
export interface ListPageState {
    dense: boolean
    isGlobalVisible: boolean
    isGlobalFilterVisible: boolean
    isFilterVisible: boolean
    isDeleteVisible: boolean
    isMobile: boolean
    selectedItems: any[]
    itemsToDelete: any[]
    isSettingsBlockVisible: boolean
}

/**
 * Компонент вывода страницы листинга сущностей
 */
class ListPageComponent extends React.Component<ListPageProps, ListPageState> {
    private configuration = listSchemaConfiguration();

    constructor(props: ListPageProps) {
        super(props);
        this.state = {
            dense: false,
            selectedItems: [],
            isGlobalVisible: false,
            isGlobalFilterVisible: false,
            isDeleteVisible: false,
            isFilterVisible: false,
            isMobile: false,
            itemsToDelete: [],
            isSettingsBlockVisible: false,
        }
    }

    /**
     * При подключении компонента проверяем, есть ли схема, запрошенная в свойствах, если ее нет,
     * тогда загружаем ее
     */
    componentDidMount() {
        this.configuration = listSchemaConfiguration();

        if (!this.props.entityList
            && !this.props.isLoading
            && !this.props.isListReloading
        ) {
            this.props.onChangeSchema(this.props.schema, this.props.additionFilter)
        }

        if (!this.props.isLoading
            && !this.props.isListReloading
            && this.props.entityList
            && JSON.stringify(this.props.additionFilter) !== JSON.stringify(this.props.entityList.baseConfiguration.additionFilter)
        ) {
            this.props.onChangeSchema(this.props.schema, this.props.additionFilter)
        }

        if (clientServerDetector().isClient()) {
            // Если это мобильная версия, то необходимо изначально скрыть фильтр для экономии места
            if (window.innerWidth > 1220) {
                this.setState({
                    ...this.state,
                    isFilterVisible: true,
                })
            } else {
                this.setState({
                    ...this.state,
                    isMobile: true,
                })
            }
        }
    }

    /**
     * При подключении компонента проверяем, есть ли схема, запрошенная в свойствах, если ее нет,
     * тогда загружаем ее, если она не совпадает с предыдущей.
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<ListPageProps>) {
        // Запускаем загрузку таблицы при изменении схемы
        if (!this.props.isLoading
            && !this.props.isListReloading
            && this.props.schema !== prevProps.schema
        ) {
            this.props.onChangeSchema(this.props.schema, this.props.additionFilter)
        }

        // Запускаем загрузку таблицы при изменении дополнительных параметров фильтрации
        if (!this.props.isLoading
            && !this.props.isListReloading
            && JSON.stringify(this.props.additionFilter) !== JSON.stringify(prevProps.additionFilter)
        ) {
            this.props.onChangeSchema(this.props.schema, this.props.additionFilter)
        }

        if (!this.props.isLoading
            && !this.props.isListReloading
            && this.props.entityList
            && JSON.stringify(this.props.additionFilter) !== JSON.stringify(this.props.entityList.baseConfiguration.additionFilter)
        ) {
            this.props.onChangeSchema(this.props.schema, this.props.additionFilter)
        }

        // Если изменилось состояние готовности запроса изменения данных, то необходимо закрыть все диалоговые окна
        if (!this.props.isChangeInProgress && prevProps.isChangeInProgress) {
            this.setState({
                isDeleteVisible: false,
            })
        }

        // Если изменился пул строк для вывода, то необходимо сбросить селекты
        if (this.props.entityList && prevProps.entityList) {
            if (JSON.stringify(prevProps.entityList?.currentData.rows) !== JSON.stringify(this.props.entityList?.currentData.rows)) {
                this.setState({
                    ...this.state,
                    selectedItems: [],
                    itemsToDelete: [],
                    isDeleteVisible: false,
                })
            }
        }

        // Когда загрузка кончилась стартуем переходы анимаций появления компонентов
        if (!this.props.isLoading && !this.state.isGlobalVisible) {
            this.setState({
                ...this.state,
                isGlobalVisible: true,
            });
            // Появление фильтра стартуем с задержкой для создания эффекта каскадного появления
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    isGlobalFilterVisible: true,
                })
            }, 300)
        }
    }

    /**
     * Блокируем лишние обновления
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: Readonly<ListPageProps>, nextState: Readonly<ListPageState>): boolean {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props)
            || JSON.stringify(nextState) !== JSON.stringify(this.state)
    }

    /**
     * Обработка удаления сущностей
     * @param items
     */
    handleDeleteItemsSubmit(items: any[]) {
        this.props.onDeleteItems(this.props.entityList, items)
    }

    /**
     * Изменение состояния отображения диалогового окна удаления
     * @param state
     */
    handleChangeDeleteDialogVisibility(state: boolean) {
        this.setState({
            ...this.state,
            isDeleteVisible: state
        })
    }

    /**
     * Обработка открытия диалогового окна при удалении
     * @param items
     */
    handleSetDeleteItems(items: any[]) {
        this.setState({
            ...this.state,
            isDeleteVisible: true,
            itemsToDelete: items,
        })
    }

    /**
     * Обработка изменения паддинга таблицы
     * @param state
     */
    handleChangeDense(state: boolean) {
        this.setState({
            ...this.state,
            dense: state
        })
    }

    /**
     * Обработка изменения сортировки
     * @param orders
     */
    handleChangeOrder(orders: OrderParameter<any>[]) {
        const entityList: ListOfSchema<any> = JSON.parse(JSON.stringify(this.props.entityList));
        entityList.currentData.parameters.order = orders;

        this.props.onChangeSchemaData(entityList)
    }

    /**
     * Обработка изменения offset
     * @param offset
     */
    handleChangeOffset(offset: number) {
        const entityList: ListOfSchema<any> = JSON.parse(JSON.stringify(this.props.entityList));
        entityList.currentData.parameters.offset = offset;

        this.props.onChangeSchemaData(entityList)
    }

    /**
     * Обработка изменения значений фильтра
     * @param field
     * @param value
     */
    handleChangeFilterValues<T extends keyof Schemas, F extends keyof Schemas[T]['fields']>(
        field: F,
        value: LoadedFilterData<keyof FilterFieldComponents, T, F>
    ) {
        const entityList: ListOfSchema<any> = JSON.parse(JSON.stringify(this.props.entityList));
        // @ts-ignore
        entityList.currentData.parameters.currentFilterValues = {
            ...this.props.entityList.currentData.parameters.currentFilterValues,
            [field]: value,
        };

        this.props.onChangeSchemaData(JSON.parse(JSON.stringify(entityList)))
    }

    /**
     * Обработка сброса значений фильтра
     */
    handleResetFilterValues() {
        const entityList: ListOfSchema<any> = JSON.parse(JSON.stringify(this.props.entityList));
        // @ts-ignore
        entityList.currentData.parameters.currentFilterValues = {
            ...this.props.entityList.currentData.parameters.originalFilterValues,
        };

        this.props.onChangeSchemaData(JSON.parse(JSON.stringify(entityList)))
    }

    /**
     * Обработка изменения limit
     * @param limit
     */
    handleChangeLimit(limit: number) {
        const entityList: ListOfSchema<any> = JSON.parse(JSON.stringify(this.props.entityList));
        entityList.currentData.parameters.offset = 0;
        entityList.currentData.parameters.limit = limit;

        this.props.onChangeSchemaData(entityList)
    }

    /**
     * Обработка выбора всех элементов
     */
    handleSelectAll() {
        this.setState({
            ...this.state,
            selectedItems: this.props.entityList.currentData.rows.map(row => row.primaryKeyValue)
        })
    }

    /**
     * Обработка отмены выбора элментов
     */
    handleUnselectAll() {
        this.setState({
            ...this.state,
            selectedItems: []
        })
    }

    /**
     * Обработка выбора элемента
     */
    handleCheckItem(item: any) {
        this.setState({
            ...this.state,
            selectedItems: [...this.state.selectedItems, item]
        })
    }

    /**
     * Обработка отмены выбора элемента
     */
    handleUncheckItem(item: any) {
        this.setState({
            ...this.state,
            selectedItems: this.state.selectedItems.filter(sel => sel !== item)
        })
    }

    /**
     * Редирект на страницу редактирования/добавления сущности
     * @param entityId
     */
    handleRedirectToEdit(entityId?: any) {
        const config = this.configuration[this.props.schema];
        if (!config) return;

        let url: PageUrl;
        if (!entityId) {
            url = {...config.addPageUrl}
        } else {
            url = {...config.editPageUrl(entityId)}
        }

        this.props.router.push(url.href, url.as)
    }

    /**
     * Переключение состояния фильтра
     */
    handleToggleFilterView() {
        this.setState({
            ...this.state,
            isFilterVisible: !this.state.isFilterVisible,
        })
    }

    /**
     * Переключение видимости блока настроект
     */
    toggleSettingsBlockVisibility() {
        this.setState({
            ...this.state,
            isSettingsBlockVisible: !this.state.isSettingsBlockVisible,
        })
    }

    /**
     * Обработка изменения текущих данных строк
     * @param response
     */
    handleChangeResponse(response: ListResponse<keyof Schemas>) {
        const schemaData: ListOfSchema<keyof Schemas> = JSON.parse(JSON.stringify(this.props.entityList));
        schemaData.currentData = response;

        this.props.onChangeSchemaData(schemaData);
    }

    /**
     * Рендеринг страницы
     */
    render() {
        // @ts-ignore
        const schema: ListPageConfiguration<any> = this.configuration[this.props.schema];
        const breadcrumbs: Breadcrumb[] = this.props.customBreadCrumbs || [
            {
                icon: 'home',
                title: "Главная",
                link: {
                    href: "/",
                }
            },
            {
                title: schema.header,
            },
        ];

        if (!this.props.hasReadAccess) {
            return (
                <React.Fragment>
                    <BreadcrumbsComponent items={breadcrumbs} />
                    <Typography variant="h4" gutterBottom>Доступ запрещен</Typography>
                    <p>У вас нет доступа к данной странице</p>
                </React.Fragment>
            )
        }

        if (this.props.isLoading || !this.props.entityList) {
            return (
                <Grid container spacing={3} style={{overflow: "hidden"}}>
                    <Grid item xs={12}>
                        <BreadcrumbsComponent items={breadcrumbs} />
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingBlocker isBlockContent={false} style={"linear"} />
                    </Grid>
                </Grid>
            )
        }

        return (
            <Grid container spacing={3} style={{overflow: "hidden"}} className={`root-list-grid`}>
                <Grid item xs={12}>
                    <SubscriptionComponent schema={this.props.schema} configuration={this.props.configuration} onEntityChange={(eventType, changedRow) => {
                        this.props.onEntityChange(this.props.entityList, eventType, changedRow)
                    }} />
                    <Grid container wrap={`nowrap`} alignItems={`center`}>
                        <Grid item className={`breadcrumbs`}>
                            <BreadcrumbsComponent items={breadcrumbs} />
                        </Grid>
                        <Grid item className={`settings-button-grid`}>
                            <Tooltip title={this.state.isSettingsBlockVisible ? `Скрыть блок настроек` : `Показать блок настроек`}>
                                <Fab color={`primary`} className={`settings-button`} size={`small`} onClick={() => this.toggleSettingsBlockVisibility()}>
                                    {this.state.isSettingsBlockVisible ? (<ChevronRightIcon color={`inherit`} />) : (<ChevronLeftIcon color={`inherit`} />)}
                                </Fab>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className={`main-list-grid`}>
                        <Grid item className={clsx(`filter`, {
                            'visible': this.state.isSettingsBlockVisible,
                        })}>
                            <div>
                                <div className={`paper-wrap-block`}>
                                    <Grid container spacing={3}>
                                        <Grow in={this.state.isGlobalVisible} timeout={1500} addEndListener={() => {}}>
                                            <Grid item xs={12}>
                                                <SettingsBlock
                                                    dense={this.state.dense}
                                                    hasEditAccess={this.props.hasEditAccess}
                                                    response={this.props.entityList.currentData}
                                                    isFilterVisible={this.state.isFilterVisible}
                                                    onDenseChange={state => this.handleChangeDense(state)}
                                                    onChangeLimit={limit => this.handleChangeLimit(limit)}
                                                    onCreateNewItem={() => this.handleRedirectToEdit()}
                                                    onToggleFilterState={() => this.handleToggleFilterView()}
                                                />
                                            </Grid>
                                        </Grow>
                                        <Grow in={this.state.isGlobalFilterVisible} timeout={1000} addEndListener={() => {}}>
                                            <Grid item xs={12} className={clsx(`filter-grid-item`, {'visible': this.state.isFilterVisible})}>
                                                <Slide direction={"left"} timeout={300} in={this.state.isFilterVisible} mountOnEnter unmountOnExit>
                                                    <div className={`filter-root-block`}>
                                                        <FilterComponent
                                                            response={this.props.entityList.currentData}
                                                            onChangeFilterValue={(field, value) => this.handleChangeFilterValues(field, value)}
                                                            onFilterReset={() => this.handleResetFilterValues()}
                                                        />
                                                    </div>
                                                </Slide>
                                            </Grid>
                                        </Grow>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                        <Grow in={this.state.isGlobalVisible} timeout={800} addEndListener={() => {}}>
                            <Grid item className={`list`}>
                                <div className={`paper-wrap-block`}>
                                    <ListComponent
                                        response={this.props.entityList.currentData}
                                        configuration={schema}
                                        isLoading={this.props.isListReloading}
                                        hasEditAccess={this.props.hasEditAccess}
                                        dense={this.state.dense}
                                        checkedItems={this.state.selectedItems}
                                        onChangeOrder={orders => this.handleChangeOrder(orders)}
                                        onChangeLimit={limit => this.handleChangeLimit(limit)}
                                        onChangeOffset={offset => this.handleChangeOffset(offset)}
                                        onUncheckItem={item => this.handleUncheckItem(item)}
                                        onCheckItem={item => this.handleCheckItem(item)}
                                        onUnselectAll={() => this.handleUnselectAll()}
                                        onSelectAll={() => this.handleSelectAll()}
                                        onEditItem={item => this.handleRedirectToEdit(item)}
                                        onDeleteItems={items => this.handleSetDeleteItems(items)}
                                        mainLangId={this.props.mainLangId}
                                        secondaryLangId={this.props.secondaryLangId}
                                        onChangeResponse={response => this.handleChangeResponse(response)}
                                    />
                                </div>
                                <DeleteDialog
                                    isVisible={this.state.isDeleteVisible}
                                    isDeleteInProgress={this.props.isChangeInProgress}
                                    checkedItems={this.state.itemsToDelete}
                                    onDeleteSubmit={submitted => this.handleDeleteItemsSubmit(submitted)}
                                    onDeleteCancel={() => this.handleChangeDeleteDialogVisibility(false)}
                                />
                            </Grid>
                        </Grow>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

// Экспортируем компонент листинга сущностей
export default ListPageComponent