import React from "react";
import {EditFieldProperties, EditValueType} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {TFieldsFactory} from "../interfaces";
import {
    FormControl, FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Tooltip,
} from "@material-ui/core";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";
import {ResetDefaultValueForField} from "../../../../services/helpers/ResetDefaultValueForField";

// Настройки поля
export interface Params {
    tooltip?: string | React.ReactNode
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    rows?: number
    rowsMax?: number
}

// Поле ввода числового значения
export const TextareaField: TFieldsFactory<Params> = (params: Params = {}) => {

    // Компонент вывода поля для ввода
    class Component extends React.Component<EditFieldProperties<keyof Schemas, any>> {
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

            const rows = params.rows ? params.rows : 8;
            const rowsMax = params.rowsMax ? params.rowsMax : rows;

            return (
                <FormControl variant="outlined" fullWidth>
                    <InputLabel error={!!this.props.error} htmlFor={`outlined-adornment-${this.props.configuration.field}`}>{this.props.configuration.title}</InputLabel>
                    <OutlinedInput
                        id={`outlined-adornment-${this.props.configuration.field}`}
                        type={'text'}
                        label={(<div>{this.props.configuration.title}</div>)}
                        value={this.props.value !== null ? `${this.props.value}` : ``}
                        error={!!this.props.error}
                        style={{paddingLeft: 16}}
                        fullWidth
                        multiline
                        rows={rows}
                        rowsMax={rowsMax}
                        startAdornment={startAdornment}
                        endAdornment={
                            <InputAdornment position="end">
                                {params.suffix}
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

    return {component: Component}
};