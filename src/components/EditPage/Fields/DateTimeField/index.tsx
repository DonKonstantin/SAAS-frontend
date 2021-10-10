import React from "react";
import {TFieldsFactory} from "../interfaces";
import {EditFieldProperties, EditValueType} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {
    createStyles,
    IconButton,
    InputAdornment, TextField,
    Tooltip, withStyles,
} from "@material-ui/core";
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import clsx from "clsx";
import {ResetDefaultValueForField} from "../../../../services/helpers/ResetDefaultValueForField";

// Настройки поля
export interface Params{
    tooltip?: string | React.ReactNode
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    preprocessValue?: {(date: Date): Date}
}

// Поле ввода числового значения
export const DateTimeField: TFieldsFactory<Params> = (params: Params = {}) => {

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
            if (value && params.preprocessValue) {
                // @ts-ignore
                value = params.preprocessValue(value)
            }

            this.props.onChange(value)
        }

        /**
         * Условия рендера компонента
         * @param nextProps
         */
        shouldComponentUpdate(nextProps: Readonly<EditFieldProperties<keyof Schemas, any>>): boolean {
            const val = JSON.stringify(this.props.value || null);
            const nextVal = JSON.stringify(nextProps.value || null);

            return val !== nextVal || this.props.error !== nextProps.error
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

            // @ts-ignore
            const value: Date | undefined = this.props.value ? this.props.value : null;
            return (
                <KeyboardDateTimePicker
                    inputVariant="outlined"
                    InputLabelProps={{
                        classes: {
                            outlined: this.props.classes.label
                        }
                    }}
                    fullWidth
                    KeyboardButtonProps={{
                        size: "small"
                    }}
                    TextFieldComponent={props => (
                        <TextField
                            {...props}
                            classes={{
                                root: clsx(`edit-field-datetime-input`, {'with-left-padding': !startAdornment}),
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
                                        <div className={`edit-field-datetime-calendar`}>{props.InputProps?.endAdornment}</div>
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
                    margin="none"
                    format="dd.MM.yyyy hh:mm:ss"
                    value={value}
                    cancelLabel={`Отмена`}
                    onChange={date => {
                        this.handleChange(date ? new Date(date.getTime()) : null)
                    }}
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
    return {component: withStyles(styles)(Component)}
};