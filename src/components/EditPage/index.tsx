import {Schemas} from "../../settings/schema";
import {EntityData} from "../../services/entityGetterService/interface";
import React from "react";
import {editSchemaConfiguration} from "../../settings/pages";
import BreadcrumbsComponent, {Breadcrumb} from "../Breadcrumbs";
import {EditPageConfiguration, EntityValues, ValidationResult} from "../../settings/pages/system/edit";
import {Grid, Grow, Typography} from "@mui/material";
import LoadingBlocker from "../LoadingBlocker";
import ButtonsComponent from "./Buttons";
import DefaultGroup from "./DefaultGroup";
import IsGroupVisible from "../../services/helpers/IsGroupVisible";
import {AdditionEditParams} from "../../containers/EntityEdit";

// Свойства страницы редактирования сущности
export interface EditPageProps {
    schema: keyof Schemas
    primaryKey: any
    entityData: EntityData<keyof Schemas>
    mainLangId: string
    secondaryLangId: string
    isLoading: boolean
    isChangeInProgress: boolean
    hasAccess: boolean
    validationResults: ValidationResult[][]
    additionEditParams: AdditionEditParams
    onSave: {(entityData: EntityData<keyof Schemas>, additionEditParams: AdditionEditParams): void}
    onSaveAsNew: {(entityData: EntityData<keyof Schemas>, additionEditParams: AdditionEditParams): void}
    onSaveAndClose: {(entityData: EntityData<keyof Schemas>, additionEditParams: AdditionEditParams): void}
    onClose: {(): void}
    onChangeEditData: {(data: EntityData<keyof Schemas>): void}
    onChangeValidation: {(validation: ValidationResult[][]): void}
    onChangeSchemaOrPrimaryKey: {(schema: keyof Schemas, primaryKey: any, additionEditParams: AdditionEditParams): void}
}

// State компонента
interface EditPageState {
    visible: boolean
    animationTime: number
}

/**
 * Компонент редактирования сущности
 */
export class EditPageComponent extends React.Component<EditPageProps, EditPageState> {
    private configuration = editSchemaConfiguration();

    private defaultAnimationTime = 800;

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: EditPageProps) {
        super(props);
        this.state = {
            visible: false,
            animationTime: 0,
        }
    }

    /**
     * Если загружены не корректные данные или их попросту нет, то вызываем событие
     * перезагрузки сущности
     */
    componentDidMount() {
        this.configuration = editSchemaConfiguration();

        if (!this.props.isLoading
            && (!this.props.entityData
                || this.props.entityData.schema !== this.props.schema
                || this.props.entityData.primaryKey !== this.props.primaryKey
            )
        ) {
            this.props.onChangeSchemaOrPrimaryKey(this.props.schema, this.props.primaryKey, this.props.additionEditParams);
            this.setState({
                ...this.state,
                visible: false,
                animationTime: 0,
            })
        }

        if (
            this.props.entityData
            && this.props.entityData.schema === this.props.schema
            && this.props.entityData.primaryKey === this.props.primaryKey
            && !this.state.visible
        ) {
            this.setState({
                ...this.state,
                visible: true,
                animationTime: this.defaultAnimationTime,
            })
        }
    }

    /**
     * Если изменились входные параметры, то вызываем перезагрузку сущности
     * @param prevProps
     */
    componentDidUpdate(prevProps: Readonly<EditPageProps>) {
        if (!this.props.isLoading
            && (prevProps.schema !== this.props.schema
                || prevProps.primaryKey !== this.props.primaryKey
            )
        ) {
            this.props.onChangeSchemaOrPrimaryKey(this.props.schema, this.props.primaryKey, this.props.additionEditParams);
            this.setState({
                ...this.state,
                visible: false,
                animationTime: 0,
            })
        }

        if (this.props.entityData
            && this.props.entityData.schema === this.props.schema
            && this.props.entityData.primaryKey === this.props.primaryKey
            && !this.state.visible
        ) {
            this.setState({
                ...this.state,
                visible: true,
                animationTime: this.defaultAnimationTime,
            })
        }
    }

    /**
     * Обработка изменения значений формы
     * @param values
     */
    handleValuesChange<T extends keyof Schemas>(values: EntityValues<T>) {
        const data: EntityData<keyof Schemas> = JSON.parse(JSON.stringify(this.props.entityData));
        data.values = JSON.parse(JSON.stringify(values));

        this.props.onChangeEditData(data)
    }

    /**
     * Обработка изменения дополнительных данных формы
     * @param group
     * @param data
     */
    handleChangeAdditionData(group: number, data: any[]) {
        const entityData: EntityData<keyof Schemas> = JSON.parse(JSON.stringify(this.props.entityData));
        entityData.additionData[group] = JSON.parse(JSON.stringify(data));

        this.props.onChangeEditData(entityData)
    }

    /**
     * Обработка изменения дополнительных данных формы в кастомном компонента
     * @param data
     */
    handleChangeAllAdditionData(data: any[][]) {
        const entityData: EntityData<keyof Schemas> = JSON.parse(JSON.stringify(this.props.entityData));
        entityData.additionData = JSON.parse(JSON.stringify(data));

        this.props.onChangeEditData(entityData)
    }

    /**
     * Обработка изменения состояния валидации поля
     * @param i
     * @param validation
     */
    handleChangeValidationResults(i: number, validation: ValidationResult[]) {
        const validations: ValidationResult[][] = JSON.parse(JSON.stringify(this.props.validationResults));
        validations[i] = validation;

        this.props.onChangeValidation(validations)
    }

    /**
     * Рендеринг страницы
     */
    render() {
        // @ts-ignore
        const schema: EditPageConfiguration<any> = this.configuration[this.props.schema];
        let breadcrumbs: Breadcrumb[] = this.props.additionEditParams.customBreadcrumbs || [
            {
                icon: 'home',
                title: "Главная",
                link: {
                    href: "/",
                }
            },
            {
                title: schema.listPageConfig.header,
                link: {...schema.listPageUrl}
            },
            {
                title: schema.header(this.props.primaryKey)
            }
        ];

        if (!this.props.hasAccess) {
            return (
                <React.Fragment>
                    <BreadcrumbsComponent items={breadcrumbs} />
                    <Typography variant="h4" gutterBottom>Доступ запрещен</Typography>
                    <p>У вас нет доступа к данной странице</p>
                </React.Fragment>
            )
        }

        if (this.props.isLoading || (!this.props.entityData
            || this.props.entityData.schema !== this.props.schema
            || this.props.entityData.primaryKey !== this.props.primaryKey
        )) {
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

        // @ts-ignore
        const config: EditPageConfiguration<any> = this.configuration[this.props.schema];

        const CustomComponent = config.bottomCustomComponent;
        return (
            <Grid container
                  spacing={3}
                  style={{overflow: "hidden", paddingBottom: 80}}
            >
                <Grid item xs={12}>
                    <BreadcrumbsComponent items={breadcrumbs} />
                </Grid>
                <Grid item xs={12} style={{position: "relative"}}>
                    <LoadingBlocker isVisible={this.props.isChangeInProgress} isBlockContent={true} style={"circle"} />
                    <Grow in={this.state.visible || false} timeout={this.state.animationTime}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    {config.groups.map((group, i) => {
                                        const isVisible = IsGroupVisible(group, this.props.entityData.values);
                                        if (!isVisible) {
                                            return null
                                        }

                                        const Component = group.component ? group.component : DefaultGroup;
                                        return (
                                            <Component
                                                key={`edit-form-group-component-${i}`}
                                                primaryKey={this.props.primaryKey}
                                                values={this.props.entityData.values}
                                                additionData={this.props.entityData.additionData[i]}
                                                customComponentData={this.props.entityData.customComponentData}
                                                configuration={group}
                                                validationResults={this.props.validationResults[i] || []}
                                                onChangeValidationResults={validation => this.handleChangeValidationResults(i, validation)}
                                                onChange={values => this.handleValuesChange(values)}
                                                onAdditionDataChange={additionData => this.handleChangeAdditionData(i, additionData)}
                                                mainLangId={this.props.mainLangId}
                                                secondaryLangId={this.props.secondaryLangId}
                                            />
                                        )
                                    })}
                                </Grid>
                            </Grid>
                            {!!CustomComponent && (
                                <Grid item xs={12}>
                                    <CustomComponent
                                        primaryKey={this.props.primaryKey}
                                        values={this.props.entityData.values}
                                        additionData={this.props.entityData.additionData}
                                        customComponentData={this.props.entityData.customComponentData}
                                        onChange={values => this.handleValuesChange(values)}
                                        onAdditionDataChange={additionData => this.handleChangeAllAdditionData(additionData)}
                                        mainLangId={this.props.mainLangId}
                                        secondaryLangId={this.props.secondaryLangId}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </Grow>
                </Grid>
                <ButtonsComponent
                    schema={this.props.schema}
                    primaryKey={this.props.primaryKey}
                    entityData={this.props.entityData}
                    isChangeInProgress={this.props.isChangeInProgress}
                    onSave={() => this.props.onSave(this.props.entityData, this.props.additionEditParams)}
                    onSaveAsNew={() => this.props.onSaveAsNew(this.props.entityData, this.props.additionEditParams)}
                    onSaveAndClose={() => this.props.onSaveAndClose(this.props.entityData, this.props.additionEditParams)}
                    onClose={this.props.onClose}
                />
            </Grid>
        );
    }
}