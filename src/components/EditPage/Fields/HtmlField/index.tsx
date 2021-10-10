import React from "react";
import {TFieldsFactory} from "../interfaces";
import {EditFieldProperties, EditValueType} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import CKEditor from "../../../CKEditor"
import clsx from "clsx";
import {FormControl, FormHelperText, Tooltip} from "@material-ui/core";

// Настройки поля
export interface Params {
    tooltip: string | React.ReactNode
}

// Поле ввода числового значения
export const HtmlField: TFieldsFactory<Partial<Params>> = (params: Partial<Params> = {}) => {
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
         * Рендеринг поля компонента
         */
        renderField() {
            return (
                <FormControl variant="outlined" fullWidth>
                    <div className={clsx(`edit-page-html-field`, {"error": !!this.props.error})}>
                        <div className={`edit-page-html-field-caption`}>{this.props.configuration.title}</div>
                        <CKEditor
                            value={this.props.value !== null ? `${this.props.value}` : ``}
                            onChange={fieldValue => {
                                let val: EditValueType = fieldValue.length > 0 ? fieldValue : null;

                                this.handleChange(val)
                            }}
                        />
                    </div>
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