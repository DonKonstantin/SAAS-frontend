import React from "react";
import {
    Chip,
    CircularProgress,
    createStyles,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip,
    withStyles
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {EditFieldProperties, EditValueType} from "../../../../../settings/pages/system/edit";
import {Schemas} from "../../../../../settings/schema";
import {ResetDefaultValueForField} from "../../../../../services/helpers/ResetDefaultValueForField";
import {v4} from "uuid";
import {relationSearchService} from "../../../../../services/relationSearchService";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import {listSchemaConfiguration} from "../../../../../settings/pages";
import {ListPageConfiguration} from "../../../../../settings/pages/system/list";
import {Collection} from "../../../../../services/types";
import {SearchUntypedLoaderItem} from "../../../../../services/searchUntypedLoader/interfaces";

// Стили компонента
const styles = createStyles({
    label: {
        transform: "translate(14px, 18px) scale(1)"
    },
    chipLabel: {
        textOverflow: "clip",
    },
});

// Локализованное значение поля
export type LocalizedField = {
    primary: string
    secondary: string
}

// Свойства компонента
export interface ComponentProps<T extends keyof Schemas, K extends keyof Schemas> extends EditFieldProperties<T, any> {
    captionFields: (keyof Schemas[K]['fields'])[],      // Набор полей для загрузки, будет участвовать в отображении названия варианта выбора. Может содержать первичный ключ
    localizedFields?: (keyof Schemas[K]['fields'])[]    // Набор локализованных полей, участвующих в отображении названия варианта выбора
    tooltip?: string | React.ReactNode                  // Подсказка при наведении на поле
    prefix?: React.ReactNode                            // Префикс поля, например иконка или надпись
    suffix?: React.ReactNode                            // Суффикс поля, например иконка или надпись

    targetSchema: K                                     // Схема, по которой происходит поиск
    targetSchemaPrimaryKey: keyof Schemas[K]['fields']  // Первичный ключ, который будет использоваться как значение поля
    targetEntityType: string                            // Целевой тип сущности, по которой будет происходить поиск
    hasEditAccess: boolean                              // Есть ли у пользователя право изменять сущность
    hasAddAccess: boolean                               // Есть ли у пользователя право добавлять сущность
    targetSchemaDefaultValueField: keyof Schemas[K]['fields']   // Поле, в которое передается значение по умолчанию при добавлении нового элемента
    chipIcon?: React.ReactElement                               // Иконка, которую отображает каждая фишка выбранного элемента

    initialValues?: SearchUntypedLoaderItem<K>[]                // Начальные значения, используются для отображения выбранных элементов при загрузке поля
    captionGenerator: {(option: SearchUntypedLoaderItem<K>, localizedFields?: Collection<LocalizedField>): string}  // Генератор названия варианта выбора.

    classes: {
        label: string,
        chipLabel: string,
    }
}

// State компонента
interface ComponentState<K extends keyof Schemas> {
    isLoading: boolean
    searchString: string
    lastLoadingId: string
    options: SearchUntypedLoaderItem<K>[]
}

/**
 * Компонент вывода поля поиска множественных значений
 */
class MultipleRelationWithSearchFieldComponent<T extends keyof Schemas, K extends keyof Schemas> extends React.Component<ComponentProps<T, K>, ComponentState<K>> {
    private readonly config = listSchemaConfiguration();

    /**
     * Конструктор компонента
     * @param props
     */
    constructor(props: ComponentProps<T, K>) {
        super(props);
        this.state = {
            isLoading: false,
            searchString: "",
            lastLoadingId: "",
            options: props.initialValues || [],
        }
    }

    /**
     * Обработка изменения значения поля
     * @param value
     */
    handleChange(value: EditValueType) {
        this.props.onChange(value);
    }

    /**
     * Обновление значения поисковой строки
     * @param searchString
     */
    handleChangeSearchString(searchString: string) {
        if (0 === searchString.length) {
            return this.handleResetSearchVariants();
        }

        this.setState({
            ...this.state,
            searchString: searchString,
            lastLoadingId: "",
        });
    }

    /**
     * Поиск подходящих сущностей при изменении поисковой строки
     * @param _
     * @param prevState
     */
    componentDidUpdate(_: Readonly<ComponentProps<T, K>>, prevState: Readonly<ComponentState<K>>) {
        if (prevState.searchString !== this.state.searchString) {
            this.handleSearchEntities(this.state.searchString)
        }
    }

    /**
     * Обработка сброса значений, доступных для выбора
     */
    handleResetSearchVariants() {
        if (!this.props.initialValues) {
            return
        }

        let items = [...this.props.initialValues];
        this.getCurrentValue().map(val => {
            if (!items.find(i => `${val.fields[this.props.targetSchemaPrimaryKey]}` === `${i.fields[this.props.targetSchemaPrimaryKey]}`)) {
                items.push(val)
            }
        });

        this.setState({
            ...this.state,
            options: items,
            searchString: "",
            lastLoadingId: "",
        });
    }

    /**
     * Поиск сущностей по поисковой строке
     * @param searchString
     */
    handleSearchEntities(searchString: string) {
        if (0 === this.state.searchString.length) {
            return this.handleResetSearchVariants()
        }

        const lastId = v4();
        this.setState({
            ...this.state,
            lastLoadingId: lastId,
            isLoading: true,
        });

        relationSearchService<K>()
            .SearchEntities({
                fieldsToLoad: [...this.props.captionFields],
                primaryKey: this.props.targetSchemaPrimaryKey,
                schema: this.props.targetSchema,
                searchEntityType: this.props.targetEntityType,
                searchPhrase: searchString,
                id: lastId,
            })
            .then(result => {
                if (this.state.lastLoadingId !== result.id) {
                    return
                }

                let items = [...result.items];
                this.getCurrentValue().map(val => {
                    if (!result.items.find(i => `${val.fields[this.props.targetSchemaPrimaryKey]}` === `${i.fields[this.props.targetSchemaPrimaryKey]}`)) {
                        items.push(val)
                    }
                });

                this.setState({
                    ...this.state,
                    isLoading: false,
                    lastLoadingId: "",
                    options: items,
                })
            })
    }

    /**
     * Получение текущего значения поля
     */
    getCurrentValue() {
        const baseValue = Array.isArray(this.props.value) ? this.props.value : [this.props.value];
        return baseValue
            .map(val => this.state.options.find((option: SearchUntypedLoaderItem<K>) => `${option.fields[this.props.targetSchemaPrimaryKey]}` === `${val}`))
            .filter(item => item !== undefined) as SearchUntypedLoaderItem<K>[];
    }

    /**
     * Добавление нового элемента
     */
    handleAddNewItem() {
        // @ts-ignore
        const schema: ListPageConfiguration<K> = this.config[this.props.targetSchema];
        if (!schema || !schema.addPageUrl) {
            return
        }

        let win = window.open(`${schema.addPageUrl.as ? schema.addPageUrl.as : schema.addPageUrl.href}?${this.props.targetSchemaDefaultValueField}=${this.state.searchString}&close_on_exit=true`, '_blank');
        if (win) {
            win.focus();
        }
    }

    /**
     * Обработка открытия окна редактирования дочерней сущности
     * @param primaryKey
     */
    handleEditItem(primaryKey: any) {
        // @ts-ignore
        const schema: ListPageConfiguration<K> = this.config[this.props.targetSchema];
        if (!schema || !schema.addPageUrl) {
            return
        }

        const url = schema.editPageUrl(primaryKey);
        let win = window.open(`${url.as ? url.as : url.href}?close_on_exit=true`, '_blank');
        if (win) {
            win.focus();
        }
    }

    /**
     * Генерация заголовка строки
     * @param option
     */
    handleOptionTitleGeneration(option: SearchUntypedLoaderItem<K>): string {
        if (option.fields.titleForAddButton) {
            return option.fields.titleForAddButton
        }

        if (!this.props.localizedFields) {
            return this.props.captionGenerator(option, {})
        }

        let localizedFields: Collection<LocalizedField> = {};
        this.props.localizedFields.map(field => {
            localizedFields[field as string] = {
                primary: "",
                secondary: "",
            };

            const fieldMessages = option.localizedFields[field as string] || [];
            fieldMessages.map(message => {
                if (message.langId === this.props.mainLangId) {
                    localizedFields[field as string].primary = message.message
                }

                if (message.langId === this.props.secondaryLangId) {
                    localizedFields[field as string].secondary = message.message
                }
            })
        });

        return this.props.captionGenerator(option, localizedFields)
    }

    /**
     * Рендеринг поля
     */
    render() {
        const currentValue = this.getCurrentValue();
        const isPrefixVisible = !!this.props.prefix || currentValue.length > 0;

        return (
            <Autocomplete
                id={`outlined-adornment-autocomplete-${this.props.configuration.field}`}
                options={this.state.options}
                value={currentValue || []}
                loading={this.state.isLoading}
                inputValue={this.state.searchString}
                loadingText={`Поиск...`}
                filterSelectedOptions
                multiple
                getOptionLabel={option => this.handleOptionTitleGeneration(option)}
                openText={`Открыть`}
                closeText={`Закрыть`}
                getOptionSelected={(option, value) => {
                    if (!!value) {
                        return `${value.fields[this.props.targetSchemaPrimaryKey]}` === `${option.fields[this.props.targetSchemaPrimaryKey]}`
                    }

                    return false
                }}
                onChange={(_, val) => {
                    if (typeof val === "string") {
                        return;
                    }

                    const isNeedAddNew = val
                        ? !!(val as SearchUntypedLoaderItem<K>[]).find(i => i.fields.id === -908181920394)
                        : false
                    ;

                    if (isNeedAddNew) {
                        return this.handleAddNewItem()
                    }

                    this.handleChange(val ? (val as SearchUntypedLoaderItem<K>[]).map(item => item.fields[this.props.targetSchemaPrimaryKey]) : null)
                }}
                filterOptions={(options, params) => {
                    const filtered = [...options];
                    if (params.inputValue !== ''
                        && this.props.hasAddAccess
                        && !this.state.isLoading
                    ) {
                        // @ts-ignore
                        filtered.push({fields: {id: -908181920394, titleForAddButton: `Добавить «${params.inputValue}»`}});
                    }

                    return filtered;
                }}
                noOptionsText={(
                    <React.Fragment>
                        {this.state.searchString.length === 0 && `Введите часть названия надбавки для поиска`}
                        {this.state.searchString.length !== 0 && `Нет результатов`}
                    </React.Fragment>
                )}
                onInputChange={(event, val) => {
                    if (!!event) {
                        this.handleChangeSearchString(val)
                    }
                }}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => {
                        const tagProps = {...getTagProps({ index })};
                        return (
                            <Chip
                                label={this.handleOptionTitleGeneration(option)}
                                icon={this.props.chipIcon}
                                onClick={() => {
                                    const primaryKey: any = option.fields[this.props.targetSchemaPrimaryKey];
                                    if (this.props.hasEditAccess) {
                                        this.handleEditItem(primaryKey)
                                    }
                                }}
                                {...tagProps}
                                classes={{
                                    label: this.props.classes.chipLabel,
                                }}
                            />
                        )
                    })
                }
                clearText={`Очистить поле`}
                popupIcon={<KeyboardArrowDownIcon />}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            classes={{
                                root: `edit-field-autocomplete-input`,
                            }}
                            InputLabelProps={{
                                ...params.InputLabelProps,
                                classes: {
                                    outlined: this.props.classes.label
                                }
                            }}
                            error={!!this.props.error}
                            helperText={this.props.error}
                            InputProps={{
                                ...params.InputProps,
                                ...isPrefixVisible
                                    ? {
                                        startAdornment: (
                                            <InputAdornment position="start" className={`left-block`}>
                                                {this.props.prefix}
                                                <div className={`chooses`}>{params.InputProps.startAdornment}</div>
                                            </InputAdornment>
                                        )
                                    }
                                    : {},
                                autoComplete: "off",
                                name: `outlined-adornment-autocomplete-${this.props.configuration.field}`,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {this.state.isLoading ? <CircularProgress style={{marginRight: 25}} color="inherit" size={20} /> : null}
                                        {this.props.suffix}
                                        <div className={`edit-field-autocomplete-arrow`}>{params.InputProps.endAdornment}</div>
                                        <Tooltip title={`Восстановить значение по умолчанию`}>
                                            <IconButton
                                                size={`small`}
                                                color={!!this.props.error ? `secondary` : `primary`}
                                                onClick={() => ResetDefaultValueForField({
                                                    configuration: this.props.configuration,
                                                    values: this.props.values,
                                                    additionData: this.props.additionData,
                                                    onSetValue: this.props.onChange,
                                                })}
                                                edge="end"
                                            >
                                                <RestoreOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }}
                            label={this.props.configuration.title}
                            variant="outlined"
                        />
                    )
                }}
            />
        )
    }

    /**
     * Рендеринг компонента
     */
    // render() {
    //     const isWithTooltip = !!this.props.tooltip && (typeof this.props.tooltip !== "string" || this.props.tooltip.length > 0);
    //     return (
    //         <React.Fragment>
    //             {isWithTooltip && (
    //                 <Tooltip title={this.props.tooltip ? this.props.tooltip : ``}>
    //                     {this.renderField()}
    //                 </Tooltip>
    //             )}
    //             {!isWithTooltip && this.renderField()}
    //         </React.Fragment>
    //     )
    // }
}

// Экспортируем компонент
export default withStyles(styles)(MultipleRelationWithSearchFieldComponent)