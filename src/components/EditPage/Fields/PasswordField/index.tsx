import React from "react";
import {EditFieldProperties, EditValueType} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {TFieldsFactory} from "../interfaces";
import {
    createStyles,
    FormControl, FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Theme,
    Tooltip, withStyles
} from "@material-ui/core";
import clsx from "clsx";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";
import {ResetDefaultValueForField} from "../../../../services/helpers/ResetDefaultValueForField";

// Настройки поля
export interface Params {
    tooltip?: string | React.ReactNode
    prefix?: React.ReactNode
    suffix?: React.ReactNode
}

// Поле ввода числового значения
export const PasswordField: TFieldsFactory<Params> = (params: Params = {}) => {

    // Стили компонента
    const styles = (theme: Theme) => createStyles({
        input: {
            padding: theme.spacing(2),
            paddingRight: 0,
            paddingLeft: 0,
        },
        inputWithoutPrefix: {
            paddingLeft: theme.spacing(2),
        },
        label: {
            transform: "translate(14px, 18px) scale(1)"
        }
    });

    // Свойства компонента
    interface ComponentProps extends EditFieldProperties<keyof Schemas, any> {
        classes: {
            input: string,
            label: string,
            inputWithoutPrefix: string,
        }
    }

    // State компонента
    interface ComponentState {
        isVisibleValue: boolean
    }

    // Компонент вывода поля для ввода
    class Component extends React.Component<ComponentProps, ComponentState> {
        state = {isVisibleValue: false};

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
         * Переключение состояния видимости значения пароля
         */
        handleToggleVisibility() {
            this.setState({
                ...this.state,
                isVisibleValue: !this.state.isVisibleValue,
            })
        }

        /**
         * Рендеринг поля компонента
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

            return (
                <FormControl variant="outlined" fullWidth>
                    <InputLabel error={!!this.props.error} classes={{outlined: this.props.classes.label}} htmlFor={`outlined-adornment-${this.props.configuration.field}`}>{this.props.configuration.title}</InputLabel>
                    <OutlinedInput
                        id={`outlined-adornment-${this.props.configuration.field}`}
                        type={this.state.isVisibleValue ? "text" : "password" }
                        classes={{
                            input: this.props.classes.input,
                            root: clsx({[this.props.classes.inputWithoutPrefix]: !startAdornment})
                        }}
                        label={(<div>{this.props.configuration.title}</div>)}
                        value={this.props.value !== null ? `${this.props.value}` : ``}
                        error={!!this.props.error}
                        autoComplete={"new-password"}
                        fullWidth
                        startAdornment={startAdornment}
                        endAdornment={
                            <InputAdornment position="end">
                                {params.suffix}
                                <Tooltip title={`${this.state.isVisibleValue ? "Скрыть" : "Показать" } пароль`}>
                                    <IconButton
                                        size={`small`}
                                        onClick={() => this.handleToggleVisibility()}
                                        color={!!this.props.error ? `secondary` : `primary`}
                                        edge="end"
                                    >
                                        {!this.state.isVisibleValue ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </Tooltip>
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
                        }
                        onChange={e => {
                            const fieldValue = (e.target as HTMLInputElement).value;
                            let val: EditValueType = fieldValue.length > 0 ? fieldValue : null;

                            this.handleChange(val)
                        }}
                    />
                    {!!this.props.error && (
                        <FormHelperText error>{this.props.error}</FormHelperText>
                    )}
                </FormControl>
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