import React from "react";
import {TFieldsFactory} from "../interfaces";
import {EditFieldProperties, EditValueType} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {FormControlLabel, Switch, Tooltip} from "@mui/material";

// Настройки поля
export interface Params {
    tooltip?: string | React.ReactNode
}

// Поле ввода числового значения
export const SwitchField: TFieldsFactory<Params> = (params: Params = {}) => {
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
            return nextProps.value !== this.props.value || this.props.error !== nextProps.error
        }

        /**
         * Рендеринг поля компонента
         */
        renderField() {
            return (
                <FormControlLabel
                    className={`edit-field-switch`}
                    control={
                        <Switch
                            checked={!!this.props.value}
                            onChange={e => this.handleChange(e.target.checked)}
                            name={`boolean-${this.props.configuration.field}`}
                            color="primary"
                        />
                    }
                    label={this.props.configuration.title}
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

    return {component: Component}
};