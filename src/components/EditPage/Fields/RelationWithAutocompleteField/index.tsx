import React from "react";
import {TFieldsFactory} from "../interfaces";
import {EditFieldProperties, EditValueType, EntityValues} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    createStyles,
    IconButton,
    InputAdornment,
    TextField,
    Tooltip, withStyles,
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import {relationVariantsDataLoader} from "../../../../services/relationVariantsDataLoader";
import {ResetDefaultValueForField} from "../../../../services/helpers/ResetDefaultValueForField";

// Настройки поля
export interface Params<T extends keyof Schemas> {
    tooltip?: string | React.ReactNode              // Подсказка при наведении на поле
    prefix?: React.ReactNode                        // Префикс поля, например иконка или надпись
    suffix?: React.ReactNode                        // Суффикс поля, например иконка или надпись
    schema: T,                                      // Схема GraphQL, для которой строится поле
    primaryKey: keyof Schemas[T]['fields'],         // Первичный ключ, который будет использоваться как значение поля
    captionFields: (keyof Schemas[T]['fields'])[],  // Набор полей для загрузки, будет участвовать в отображении названия варианта выбора. Может содержать первичный ключ
    captionGenerator: {(option: any): string}       // Генератор названия варианта выбора.
}

// Поле ввода числового значения
export const RelationWithAutocompleteField: TFieldsFactory<Params<keyof Schemas>> = (
    params: Params<keyof Schemas> = {
        captionFields: [],
        captionGenerator: (option) => Object.values(option).join(", "),
        //@ts-ignore
        schema: undefined,
        //@ts-ignore
        primaryKey: undefined,
    }
) => {

    // Стили компонента
    const styles = createStyles({
        label: {
            transform: "translate(14px, 18px) scale(1)"
        }
    });

    // Свойства компонента
    interface ComponentProps extends EditFieldProperties<keyof Schemas, any> {
        classes: {
            label: string,
        }
    }

    // Компонент вывода поля для ввода
    class Component extends React.Component<ComponentProps> {
        /**
         * Обработка изменения значения поля
         * @param value
         */
        handleChange(value: EditValueType) {
            this.props.onChange(value)
        }

        /**
         * Условия рендера компонента
         * @param nextProps
         */
        shouldComponentUpdate(nextProps: Readonly<EditFieldProperties<keyof Schemas, any>>): boolean {
            return this.props.value !== nextProps.value || this.props.error !== nextProps.error
        }

        /**
         * Рендеринг поля
         */
        renderField() {
            let startAdornment: React.ReactNode = null;
            if (params.prefix) {
                startAdornment = (
                    <InputAdornment position="start">
                        {params.prefix}
                    </InputAdornment>
                )
            }

            const data = this.props.additionData;
            const currentValue = data.find((option: any) => option.primaryKey === this.props.value);
            const options = [...data, null];

            return (
                <Autocomplete
                    id={`outlined-adornment-autocomplete-${this.props.configuration.field}`}
                    options={options}
                    value={currentValue || null}
                    getOptionLabel={option => option ? params.captionGenerator(option) : ``}
                    onChange={(_, val) => {
                        this.handleChange(val ? val.primaryKey : null)
                    }}
                    noOptionsText={'Нет значений'}
                    clearText={`Очистить поле`}
                    popupIcon={<KeyboardArrowDownIcon />}
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            classes={{
                                root: `edit-field-autocomplete-input`,
                            }}
                            InputLabelProps={{
                                ...props.InputLabelProps,
                                classes: {
                                    outlined: this.props.classes.label
                                }
                            }}
                            error={!!this.props.error}
                            helperText={this.props.error}
                            InputProps={{
                                ...props.InputProps,
                                startAdornment: startAdornment,
                                autoComplete: "off",
                                name: `outlined-adornment-autocomplete-${this.props.configuration.field}`,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {params.suffix}
                                        <div className={`edit-field-autocomplete-arrow`}>{props.InputProps.endAdornment}</div>
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
                    )}
                />
            )
        }

        /**
         * Рендеринг компонента
         */
        render() {
            const isWithTooltip = !!params.tooltip && (typeof params.tooltip !== "string" || params.tooltip.length > 0);
            return (
                <React.Fragment>
                    {isWithTooltip && (
                        <Tooltip title={params.tooltip ? params.tooltip : ``}>
                            {this.renderField()}
                        </Tooltip>
                    )}
                    {!isWithTooltip && this.renderField()}
                </React.Fragment>
            )
        }
    }

    // Подключаем стили к компоненту
    return {
        component: withStyles(styles)(Component),
        additionData: async (_: EntityValues<any>, __: any, token?: string) => await relationVariantsDataLoader(token).Load({
            schema: params.schema,
            primaryKey: params.primaryKey,
            captionFields: params.captionFields,
        })
    }
};